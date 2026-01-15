#!/usr/bin/env python3
"""
Script to create favicon.ico from logo.png
Requires Pillow: pip install Pillow
"""

from PIL import Image
import os
import sys

def create_favicon(input_path, output_path):
    """
    Create a multi-size ICO file from an input image.
    
    Args:
        input_path: Path to the source logo image
        output_path: Path where the favicon.ico will be saved
    """
    try:
        # Open the source image
        img = Image.open(input_path)
        
        # Convert to RGBA if needed (for transparency support)
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Create a list of sizes for the ICO file (common favicon sizes)
        sizes = [(16, 16), (32, 32), (48, 48)]
        
        # Create resized images
        images = []
        for size in sizes:
            resized = img.resize(size, Image.Resampling.LANCZOS)
            images.append(resized)
        
        # Save as ICO file with multiple sizes
        images[0].save(
            output_path,
            format='ICO',
            sizes=[(img.width, img.height) for img in images],
            append_images=images[1:] if len(images) > 1 else []
        )
        
        print(f"✓ Successfully created {output_path}")
        print(f"  Sizes: {', '.join([f'{w}x{h}' for w, h in sizes])}")
        return True
        
    except FileNotFoundError:
        print(f"✗ Error: File not found: {input_path}")
        return False
    except Exception as e:
        print(f"✗ Error creating favicon: {e}")
        return False

def main():
    # Default paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(script_dir, 'web', 'public', 'logo.png')
    output_path = os.path.join(script_dir, 'web', 'public', 'favicon.ico')
    
    # Allow custom input/output paths via command line
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
    if len(sys.argv) > 2:
        output_path = sys.argv[2]
    
    print(f"Creating favicon from: {input_path}")
    print(f"Output: {output_path}")
    print()
    
    if not os.path.exists(input_path):
        print(f"✗ Error: Logo file not found at {input_path}")
        print(f"  Please ensure logo.png exists in web/public/")
        sys.exit(1)
    
    success = create_favicon(input_path, output_path)
    
    if success:
        print()
        print("Favicon created successfully!")
        print(f"Location: {output_path}")
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()
