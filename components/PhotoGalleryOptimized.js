// components/PhotoGalleryOptimized.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const PhotoItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  background: var(--light);
`;

export default function PhotoGalleryOptimized({ eventId }) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadPhotos = useCallback(async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/photos?page=${page}`);
      const data = await response.json();
      
      setPhotos(prev => [...prev, ...data.photos]);
      setHasMore(data.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }, [eventId, page]);

  useEffect(() => {
    if (inView && hasMore) {
      loadPhotos();
    }
  }, [inView, hasMore, loadPhotos]);

  return (
    <>
      <Grid>
        {photos.map((photo) => (
          <PhotoItem key={photo.id}>
            <Image
              src={photo.thumbnailUrl || photo.url}
              alt={photo.title || 'Event photo'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          </PhotoItem>
        ))}
      </Grid>
      {hasMore && <div ref={ref} style={{ height: '20px' }} />}
    </>
  );
}
