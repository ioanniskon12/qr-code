// lib/email/resend.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const data = await resend.emails.send({
      from: 'QRMemories <noreply@qrmemories.com>',
      to,
      subject,
      html,
      text,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
};