// app/api/events/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { generateQRCode } from '@/utils/qrcode';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Create event
    const event = await prisma.event.create({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        expiresAt: calculateExpiration(data.expiration),
        isPasswordProtected: data.isPasswordProtected,
        password: data.password ? await bcrypt.hash(data.password, 10) : null,
        allowGuestUploads: data.allowGuestUploads,
      }
    });

    // Generate QR code
    const qrCode = await generateQRCode(event.id);
    
    await prisma.qRCode.create({
      data: {
        eventId: event.id,
        code: qrCode,
        isProtected: data.isPasswordProtected,
        password: data.password ? await bcrypt.hash(data.password, 10) : null,
      }
    });

    return NextResponse.json({ event, qrCode });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

function calculateExpiration(expirationType) {
  const now = new Date();
  switch (expirationType) {
    case '30days':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    case '1year':
      return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    case 'never':
      return null;
    default:
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}
