// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/resend';
import { emailTemplates } from '@/lib/email/templates';

export async function POST(request) {
  const { type, data } = await request.json();

  let emailContent;
  switch (type) {
    case 'welcome':
      emailContent = emailTemplates.welcome(data.name);
      break;
    case 'eventCreated':
      emailContent = emailTemplates.eventCreated(data.eventName, data.qrCode);
      break;
    case 'photoUploaded':
      emailContent = emailTemplates.photoUploaded(data.eventName, data.photoCount);
      break;
    default:
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
  }

  const result = await sendEmail({
    to: data.email,
    ...emailContent,
  });

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
