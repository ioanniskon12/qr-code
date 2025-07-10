// utils/upload.js
import { v4 as uuidv4 } from 'uuid';

export async function uploadToStorage(file, eventId) {
  const fileName = `${eventId}/${uuidv4()}-${file.name}`;
  
  // For Firebase Storage
  // const storage = getStorage();
  // const storageRef = ref(storage, fileName);
  // const snapshot = await uploadBytes(storageRef, file);
  // const downloadURL = await getDownloadURL(snapshot.ref);
  
  // For AWS S3
  // const s3 = new S3Client({ region: process.env.AWS_REGION });
  // const command = new PutObjectCommand({
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: fileName,
  //   Body: file,
  //   ContentType: file.type,
  // });
  // await s3.send(command);
  
  // Return the URL
  return `https://storage.example.com/${fileName}`;
}
