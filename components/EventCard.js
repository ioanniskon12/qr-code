// components/EventCard.js
'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Card, Button } from './styled';
import { format } from 'date-fns';
import { FiImage, FiUsers } from 'react-icons/fi';

const EventImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  margin: -2rem -2rem 1.5rem -2rem;
  border-radius: 1rem 1rem 0 0;
`;

const EventMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--gray);
  font-size: 0.875rem;
  margin: 1rem 0;
`;

const EventActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export default function EventCard({ event }) {
  return (
    <Card hoverable padding="0">
      <div style={{ padding: '2rem' }}>
        <EventImage>{event.emoji}</EventImage>
        <h3>{event.title}</h3>
        <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>
          {format(event.date, 'MMMM d, yyyy')}
        </p>
        <EventMeta>
          <span><FiImage /> {event.photoCount} photos</span>
          <span><FiUsers /> {event.contributorCount} contributors</span>
        </EventMeta>
        <EventActions>
          <Button 
            variant="primary" 
            size="sm" 
            as={Link} 
            href={`/gallery/${event.id}`}
          >
            View
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            as={Link} 
            href={`/dashboard/events/${event.id}/qr`}
          >
            QR Code
          </Button>
        </EventActions>
      </div>
    </Card>
  );
}