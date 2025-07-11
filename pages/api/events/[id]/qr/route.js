// pages/api/events/[id]/qr.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
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
        return res.status(404).json({ error: 'Event not found' });
      }

      const qrCode = event.qrCodes[0];
      const qrCodeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/gallery/${qrCode.code}`;

      return res.status(200).json({
        event,
        qrCode: {
          ...qrCode,
          url: qrCodeUrl
        }
      });
    } catch (error) {
      console.error('Error fetching QR code:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}