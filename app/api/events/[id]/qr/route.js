// app/api/events/[id]/qr/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const event = await prisma.event.findFirst({
      where: {
        id,
        userId: session.user.id
      },
      include: {
        qrCodes: true
      }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const qrCode = event.qrCodes[0];
    const qrCodeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/gallery/${qrCode.code}`;

    return NextResponse.json({
      event,
      qrCode: {
        ...qrCode,
        url: qrCodeUrl
      }
    });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}