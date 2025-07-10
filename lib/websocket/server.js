// lib/websocket/server.js
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

let io;

export async function initializeWebSocket(server) {
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST']
    },
    adapter: createAdapter(pubClient, subClient)
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-event', (eventId) => {
      socket.join(`event-${eventId}`);
      console.log(`Socket ${socket.id} joined event ${eventId}`);
    });

    socket.on('leave-event', (eventId) => {
      socket.leave(`event-${eventId}`);
    });

    socket.on('photo-upload', (data) => {
      socket.to(`event-${data.eventId}`).emit('new-photo', data);
    });

    socket.on('start-slideshow', (eventId) => {
      socket.to(`event-${eventId}`).emit('slideshow-started');
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('WebSocket not initialized');
  }
  return io;
}