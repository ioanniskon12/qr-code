// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadFile } from '@/lib/storage';
import { optimizeImage, generateThumbnail } from '@/lib/image-optimization';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const formData = await request.formData();
  const file = formData.get('file');
  const eventId = formData.get('eventId');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Optimize image
    const optimizedBuffer = await optimizeImage(buffer);
    const thumbnailBuffer = await generateThumbnail(buffer);

    // Create File objects from buffers
    const optimizedFile = new File([optimizedBuffer], file.name, { type: 'image/webp' });
    const thumbnailFile = new File([thumbnailBuffer], `thumb-${file.name}`, { type: 'image/webp' });

    // Upload both versions
    const [imageUrl, thumbnailUrl] = await Promise.all([
      uploadFile(optimizedFile, eventId, session?.user?.id),
      uploadFile(thumbnailFile, eventId, session?.user?.id),
    ]);

    // Save to database
    const photo = await prisma.photo.create({
      data: {
        eventId,
        uploaderId: session?.user?.id || null,
        url: imageUrl,
        thumbnailUrl,
        title: formData.get('title') || null,
        tags: formData.get('tags')?.split(',').map(tag => tag.trim()) || [],
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}