// lib/storage/index.js
// Unified storage interface
const storageProvider = process.env.STORAGE_PROVIDER || 'firebase';

export const uploadFile = async (file, eventId, userId) => {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
  const path = `events/${eventId}/${userId || 'guest'}/${fileName}`;

  if (storageProvider === 'firebase') {
    const { uploadFile: firebaseUpload } = await import('./firebase');
    return await firebaseUpload(file, path);
  } else if (storageProvider === 's3') {
    const { uploadToS3 } = await import('./s3');
    return await uploadToS3(file, path);
  }
  
  throw new Error('Invalid storage provider');
};