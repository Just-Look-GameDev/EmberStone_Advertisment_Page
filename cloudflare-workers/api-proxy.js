/**
 * Cloudflare Worker to proxy API requests to the EmberStone API server
 * 
 * This solves the mixed content issue for GitHub Pages:
 * - GitHub Pages serves over HTTPS
 * - API server is HTTP-only (http://join.emberstone.net:3000)
 * - Worker makes HTTP requests server-side (no mixed content) and serves HTTPS to frontend
 */

// The backend API server URL (HTTP only - that's fine, Worker handles it server-side)
// Note: Cloudflare Workers doesn't allow direct IP access, must use domain name
const API_BASE_URL = 'http://join.emberstone.net:3000'

// Allowed origins (matching backend CORS settings)
const ALLOWED_ORIGINS = [
  'https://emberstone.net',
  'https://www.emberstone.net'
]

// Get CORS headers based on request origin
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin')
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

export default {
  async fetch(request) {
    const CORS_HEADERS = getCorsHeaders(request)
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      })
    }

    try {
      // Get the path and query string from the request
      const url = new URL(request.url)
      const path = url.pathname
      const query = url.search

      // Build the backend API URL
      const apiUrl = `${API_BASE_URL}${path}${query}`
      
      console.log('Worker received request:', request.url)
      console.log('Proxying to backend:', apiUrl)
      console.log('Request method:', request.method)

      // Forward the request to the backend API (HTTP is fine - Worker handles it server-side)
      // The Worker receives HTTPS requests from the frontend and makes HTTP requests to the backend
      // This solves the mixed content issue for GitHub Pages
      
      // Create headers object, setting minimal headers for the backend request
      const headers = new Headers()
      // Only forward essential headers, don't forward Cloudflare-specific ones
      const contentType = request.headers.get('Content-Type')
      if (contentType) {
        headers.set('Content-Type', contentType)
      }
      
      // Add timeout and connection options
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
      
      console.log('Attempting fetch to:', apiUrl)
      console.log('Headers:', Object.fromEntries(headers))
      
      const response = await fetch(apiUrl, {
        method: request.method,
        headers: headers,
        signal: controller.signal,
        // Forward the body if present
        body: request.method !== 'GET' && request.method !== 'HEAD' 
          ? await request.clone().arrayBuffer() 
          : null,
      })
      
      console.log('Fetch successful, status:', response.status)
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        console.error('Backend returned error:', response.status, response.statusText)
      }

      // Get the response body
      const responseBody = await response.text()
      
      // Create a new response with CORS headers
      const proxiedResponse = new Response(responseBody, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': response.headers.get('Content-Type') || 'application/json',
        },
      })

      return proxiedResponse
    } catch (error) {
      console.error('Proxy error:', error)
      
      // Provide more specific error messages
      let errorMessage = error.message
      let statusCode = 500
      
      if (error.name === 'AbortError' || error.message.includes('timeout') || error.message.includes('aborted')) {
        errorMessage = 'Request to API server timed out. The server may be slow or unreachable from Cloudflare\'s network.'
        statusCode = 504
      } else if (error.message.includes('fetch failed') || error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        errorMessage = 'Cannot connect to API server. Possible causes: DNS resolution failure, server down, or firewall blocking Cloudflare IPs.'
        statusCode = 502
      } else if (error.message.includes('DNS')) {
        errorMessage = 'DNS resolution failed. The domain join.emberstone.net may not be resolvable from Cloudflare\'s network.'
        statusCode = 502
      }
      
      return new Response(
        JSON.stringify({
          error: 'Proxy error',
          message: errorMessage,
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        }),
        {
          status: statusCode,
          headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json',
          },
        }
      )
    }
  },
}
