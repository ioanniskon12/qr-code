// app/gallery/[qr]/page.js
'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '@/components/Navigation';
import { Container, Button, Card } from '@/components/styled';
import PhotoUploadModal from '@/components/PhotoUploadModal';
import PhotoGrid from '@/components/PhotoGrid';
import { FiUpload, FiDownload } from 'react-icons/fi';

const GalleryHeader = styled.div`
  text-align: center;
  padding: 3rem 0;
  background: white;
  margin-bottom: 2rem;
`;

const GalleryActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

export default function GalleryPage({ params }) {
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [params.qr]);

  const fetchEventData = async () => {
    try {
      const response = await fetch(`/api/events/${params.qr}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data.event);
        setPhotos(data.photos);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (newPhoto) => {
    setPhotos(prev => [newPhoto, ...prev]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return (
      <>
        <Navigation />
        <Container>
          <Card style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Event not found</h2>
            <p>This QR code is invalid or has expired.</p>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <GalleryHeader>
        <Container>
          <h1>{event.title}</h1>
          <p style={{ color: 'var(--gray)' }}>
            {photos.length} photos • {event.contributorCount} contributors
          </p>
          <GalleryActions>
            <Button 
              variant="primary" 
              onClick={() => setUploadModalOpen(true)}
            >
              <FiUpload /> Upload Photos
            </Button>
            <Button variant="secondary">
              <FiDownload /> Download All
            </Button>
          </GalleryActions>
        </Container>
      </GalleryHeader>

      <Container>
        <PhotoGrid photos={photos} />
      </Container>

      <PhotoUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        eventId={event.id}
        onUpload={handlePhotoUpload}
      />
    </>
  );
}