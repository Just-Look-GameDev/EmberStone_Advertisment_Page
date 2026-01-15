import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'iibrhkoa',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
