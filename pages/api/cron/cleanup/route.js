// api/cron/cleanup/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/storage';

export async function GET(request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Find expired events
    const expiredEvents = await prisma.event.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
      include: {
        photos: true,
      },
    });

    // Delete photos from storage
    for (const event of expiredEvents) {
      for (const photo of event.photos) {
        try {
          await deleteFile(photo.url);
          if (photo.thumbnailUrl) {
            await deleteFile(photo.thumbnailUrl);
          }
        } catch (error) {
          console.error(`Failed to delete photo ${photo.id}:`, error);
        }
      }
    }

    // Delete from database
    const deletedCount = await prisma.event.deleteMany({
      where: {
        id: {
          in: expiredEvents.map(e => e.id),
        },
      },
    });

    return NextResponse.json({
      success: true,
      deletedEvents: deletedCount.count,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}