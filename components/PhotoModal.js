// components/PhotoModal.js
'use client';

import styled from 'styled-components';
import Modal from './Modal';
import { Button } from './styled';
import { FiDownload, FiHeart, FiShare2 } from 'react-icons/fi';

const PhotoContainer = styled.div`
  text-align: center;
`;

const PhotoImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const PhotoInfo = styled.div`
  text-align: left;
  margin: 1rem 0;
`;

const PhotoActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: var(--light);
  color: var(--gray);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
`;

export default function PhotoModal({ photo, onClose }) {
  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.title || 'photo.jpg';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title || 'Event Photo',
          url: photo.url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={photo.title || 'Photo'} maxWidth="800px">
      <PhotoContainer>
        <PhotoImage src={photo.url} alt={photo.title || 'Event photo'} />
        
        <PhotoInfo>
          {photo.title && <h3>{photo.title}</h3>}
          <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>
            Uploaded by {photo.uploaderName || 'Guest'} • {new Date(photo.createdAt).toLocaleDateString()}
          </p>
          
          {photo.tags && photo.tags.length > 0 && (
            <div>
              <strong>Tags:</strong>
              <TagList>
                {photo.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagList>
            </div>
          )}
        </PhotoInfo>

        <PhotoActions>
          <Button variant="primary" onClick={handleDownload}>
            <FiDownload /> Download
          </Button>
          <Button variant="secondary">
            <FiHeart /> Like
          </Button>
          {navigator.share && (
            <Button variant="secondary" onClick={handleShare}>
              <FiShare2 /> Share
            </Button>
          )}
        </PhotoActions>
      </PhotoContainer>
    </Modal>
  );
}