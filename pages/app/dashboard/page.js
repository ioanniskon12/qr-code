// app/dashboard/page.js
'use client';

import styled from 'styled-components';
import { Grid, Card } from '@/components/styled';
import EventCard from '@/components/EventCard';
import { useSession } from 'next-auth/react';

const DashboardHeader = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
`;

const StatsGrid = styled(Grid)`
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
  
  h3 {
    color: var(--gray);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
  }
`;

export default function DashboardPage() {
  const { data: session } = useSession();

  // Mock data - replace with real data from API
  const stats = {
    activeEvents: 3,
    totalPhotos: 247,
    qrScans: 89,
    storageUsed: '1.2GB'
  };

  const recentEvents = [
    {
      id: '1',
      title: "Sarah's Birthday",
      date: new Date('2024-01-15'),
      photoCount: 45,
      contributorCount: 12,
      emoji: '🎂'
    },
    {
      id: '2',
      title: 'Wedding Reception',
      date: new Date('2024-01-10'),
      photoCount: 189,
      contributorCount: 67,
      emoji: '💑'
    },
    {
      id: '3',
      title: 'Art Exhibition',
      date: new Date('2024-01-05'),
      photoCount: 13,
      contributorCount: 8,
      emoji: '🎨'
    }
  ];

  return (
    <>
      <DashboardHeader>
        <h1>Welcome back, {session?.user?.name || 'User'}!</h1>
        <p>Here's what's happening with your events</p>
      </DashboardHeader>

      <StatsGrid minWidth="250px">
        <StatCard>
          <h3>Active Events</h3>
          <div className="value">{stats.activeEvents}</div>
        </StatCard>
        <StatCard>
          <h3>Total Photos</h3>
          <div className="value">{stats.totalPhotos}</div>
        </StatCard>
        <StatCard>
          <h3>QR Scans</h3>
          <div className="value">{stats.qrScans}</div>
        </StatCard>
        <StatCard>
          <h3>Storage Used</h3>
          <div className="value">{stats.storageUsed}</div>
        </StatCard>
      </StatsGrid>

      <h2 style={{ margin: '2rem 0 1rem' }}>Recent Events</h2>
      <Grid>
        {recentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Grid>
    </>
  );
}