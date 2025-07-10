// lib/email/templates.js
export const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to QRMemories!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366F1;">Welcome to QRMemories, ${name}!</h1>
        <p>Thank you for joining our photo-sharing platform. You're now ready to create amazing event galleries!</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="background: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Get Started
        </a>
        <p>Need help? Reply to this email or visit our support center.</p>
      </div>
    `,
    text: `Welcome to QRMemories, ${name}! Get started at ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  }),

  eventCreated: (eventName, qrCode) => ({
    subject: `Your event "${eventName}" is ready!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366F1;">Your Event is Live!</h1>
        <p>Your event "${eventName}" has been created successfully.</p>
        <div style="text-align: center; margin: 30px 0;">
          <img src="${qrCode}" alt="QR Code" style="max-width: 300px;">
          <p style="font-size: 14px; color: #666;">Share this QR code with your guests</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="background: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View Dashboard
        </a>
      </div>
    `,
    text: `Your event "${eventName}" is ready! View it at ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  }),

  photoUploaded: (eventName, photoCount) => ({
    subject: `New photos added to "${eventName}"`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366F1;">New Photos!</h1>
        <p>Someone just added photos to your event "${eventName}".</p>
        <p style="font-size: 24px; color: #6366F1; text-align: center; margin: 20px 0;">
          📸 ${photoCount} total photos
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/gallery" 
           style="background: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View Gallery
        </a>
      </div>
    `,
    text: `New photos added to "${eventName}". Total: ${photoCount} photos.`,
  }),
};