// lib/image-optimization.js
import sharp from 'sharp';

export async function optimizeImage(buffer, options = {}) {
  const {
    width = 1920,
    height = 1080,
    quality = 85,
    format = 'webp',
  } = options;

  try {
    const optimized = await sharp(buffer)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat(format, { quality })
      .toBuffer();

    return optimized;
  } catch (error) {
    console.error('Image optimization error:', error);
    throw error;
  }
}

export async function generateThumbnail(buffer, size = 300) {
  try {
    const thumbnail = await sharp(buffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'center',
      })
      .toFormat('webp', { quality: 80 })
      .toBuffer();

    return thumbnail;
  } catch (error) {
    console.error('Thumbnail generation error:', error);
    throw error;
  }
}