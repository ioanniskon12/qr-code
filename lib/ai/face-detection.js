// lib/ai/face-detection.js
import * as faceapi from 'face-api.js';
import { prisma } from '@/lib/prisma';

export class FaceDetectionService {
  constructor() {
    this.modelsLoaded = false;
  }

  async loadModels() {
    if (this.modelsLoaded) return;
    
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ageGenderNet.loadFromUri('/models')
    ]);
    
    this.modelsLoaded = true;
  }

  async detectFaces(imageUrl) {
    await this.loadModels();
    
    const img = await faceapi.fetchImage(imageUrl);
    const detections = await faceapi
      .detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()
      .withAgeAndGender();
    
    return detections.map(detection => ({
      box: detection.detection.box,
      descriptor: Array.from(detection.descriptor),
      expressions: detection.expressions,
      age: detection.age,
      gender: detection.gender,
      genderProbability: detection.genderProbability
    }));
  }

  async findSimilarFaces(descriptor, threshold = 0.6) {
    const faces = await prisma.detectedFace.findMany({
      include: { photo: true }
    });
    
    const matches = [];
    for (const face of faces) {
      const distance = faceapi.euclideanDistance(
        descriptor,
        face.descriptor
      );
      
      if (distance < threshold) {
        matches.push({
          face,
          similarity: 1 - distance
        });
      }
    }
    
    return matches.sort((a, b) => b.similarity - a.similarity);
  }

  async groupPhotosByPeople(eventId) {
    const photos = await prisma.photo.findMany({
      where: { eventId },
      include: { detectedFaces: true }
    });
    
    const groups = new Map();
    
    for (const photo of photos) {
      for (const face of photo.detectedFaces) {
        const personId = face.personId || `unknown_${face.id}`;
        
        if (!groups.has(personId)) {
          groups.set(personId, {
            personId,
            personName: face.personName,
            photos: []
          });
        }
        
        groups.get(personId).photos.push(photo);
      }
    }
    
    return Array.from(groups.values());
  }
}