// lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// ===== QR CODE UTILITIES =====
// utils/qrcode.js
import QRCode from 'qrcode';
import crypto from 'crypto';

export async function generateQRCode(eventId) {
  const code = `EVT-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/gallery/${code}`;
  
  const qrDataUrl = await QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#6366F1',
      light: '#FFFFFF'
    }
  });
  
  return { code, dataUrl: qrDataUrl, url };
}

export function validateQRCode(code) {
  const pattern = /^EVT-\d{4}-[A-F0-9]{8}$/;
  return pattern.test(code);
}
