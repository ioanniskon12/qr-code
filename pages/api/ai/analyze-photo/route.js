// app/api/ai/analyze-photo/route.js
import { NextResponse } from 'next/server';
import { FaceDetectionService } from '@/lib/ai/face-detection';
import { SceneDetectionService } from '@/lib/ai/scene-detection';
import { prisma } from '@/lib/prisma';

const faceService = new FaceDetectionService();
const sceneService = new SceneDetectionService();

export async function POST(request) {
  const { photoId } = await request.json();
  
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId }
    });
    
    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }
    
    // Detect faces
    const faces = await faceService.detectFaces(photo.url);
    
    // Save detected faces
    for (const face of faces) {
      const similarFaces = await faceService.findSimilarFaces(face.descriptor);
      
      let personId = null;
      if (similarFaces.length > 0 && similarFaces[0].similarity > 0.8) {
        personId = similarFaces[0].face.personId;
      }
      
      await prisma.detectedFace.create({
        data: {
          photoId,
          personId,
          descriptor: face.descriptor,
          boundingBox: face.box,
          age: face.age,
          gender: face.gender,
          expressions: face.expressions
        }
      });
    }
    
    // Detect objects and scenes
    const img = new Image();
    img.src = photo.url;
    await new Promise(resolve => img.onload = resolve);
    
    const objects = await sceneService.detectObjects(img);
    const scenes = await sceneService.classifyScene(img);
    
    // Update photo with AI data
    await prisma.photo.update({
      where: { id: photoId },
      data: {
        aiTags: [...objects.map(o => o.class), ...scenes.map(s => s.className)],
        analyzed: true
      }
    });
    
    return NextResponse.json({
      faces: faces.length,
      objects,
      scenes
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}