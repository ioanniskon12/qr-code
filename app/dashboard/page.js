// app/dashboard/page.js
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Card, Button, Grid } from '@/components/styled';
import { FiCalendar, FiMapPin, FiImage } from 'react-icons/fi';

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const EventCard = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export default function DashboardPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardHeader>
        <h1>My Events</h1>
        <Link href="/dashboard/events/new">
          <Button>Create Event</Button>
        </Link>
      </DashboardHeader>

      <Grid>
        {events.map((event) => (
          <Link key={event.id} href={`/dashboard/events/${event.id}`}>
            <EventCard>
              <h3>{event.name}</h3>
              <p>
                <FiCalendar /> {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <FiMapPin /> {event.location}
              </p>
              <p>
                <FiImage /> {event._count.photos} photos
              </p>
            </EventCard>
          </Link>
        ))}
      </Grid>
    </>
  );
}