// components/PhotoGrid.js
'use client';

import styled from 'styled-components';
import { useState } from 'react';
import PhotoModal from './PhotoModal';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 4rem;
`;

const PhotoItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  aspect-ratio: 1;
  background: var(--light);
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PhotoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s;
  
  ${PhotoItem}:hover & {
    transform: translateY(0);
  }
`;

export default function PhotoGrid({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <>
      <Grid>
        {photos.map((photo) => (
          <PhotoItem key={photo.id} onClick={() => setSelectedPhoto(photo)}>
            <img src={photo.url} alt={photo.title || 'Event photo'} />
            <PhotoOverlay>
              <p>{photo.title || 'Untitled'}</p>
              <small>by {photo.uploaderName || 'Guest'}</small>
            </PhotoOverlay>
          </PhotoItem>
        ))}
      </Grid>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
}