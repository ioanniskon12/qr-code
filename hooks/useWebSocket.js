// hooks/useWebSocket.js
'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export function useWebSocket(eventId) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [newPhotos, setNewPhotos] = useState([]);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_APP_URL);

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket');
      setConnected(true);
      socketInstance.emit('join-event', eventId);
    });

    socketInstance.on('new-photo', (photo) => {
      setNewPhotos(prev => [...prev, photo]);
    });

    socketInstance.on('disconnect', () => {
      setConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.emit('leave-event', eventId);
      socketInstance.disconnect();
    };
  }, [eventId]);

  return { socket, connected, newPhotos };
}