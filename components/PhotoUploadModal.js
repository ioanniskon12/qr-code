// components/PhotoUploadModal.js
'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { Button, Input, FormGroup, Label } from './styled';
import Modal from './Modal';
import { FiUpload, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const DropZone = styled.div`
  border: 3px dashed var(--border);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  background: ${props => props.isDragActive ? 'rgba(99, 102, 241, 0.05)' : 'white'};
  border-color: ${props => props.isDragActive ? 'var(--primary)' : 'var(--border)'};
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.02);
  }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #DC2626;
  }
`;

export default function PhotoUploadModal({ isOpen, onClose, eventId, onUpload }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 10485760 // 10MB
  });

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      // Upload logic here
      // For now, simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${files.length} photos uploaded successfully!`);
      onClose();
      setFiles([]);
      setTitle('');
      setTags('');
    } catch (error) {
      toast.error('Error uploading photos');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Photos">
      <DropZone {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <FiUpload size={48} color="var(--primary)" />
        <h3 style={{ margin: '1rem 0' }}>
          {isDragActive ? 'Drop photos here' : 'Drag & drop photos'}
        </h3>
        <p style={{ color: 'var(--gray)' }}>
          or click to select files (max 10MB each)
        </p>
      </DropZone>

      {files.length > 0 && (
        <>
          <PreviewGrid>
            {files.map((file, index) => (
              <PreviewItem key={index}>
                <img src={file.preview} alt={`Preview ${index}`} />
                <RemoveButton onClick={() => removeFile(index)}>
                  <FiX size={12} />
                </RemoveButton>
              </PreviewItem>
            ))}
          </PreviewGrid>

          <FormGroup style={{ marginTop: '1.5rem' }}>
            <Label>Title (optional)</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title for these photos"
            />
          </FormGroup>

          <FormGroup>
            <Label>Tags (optional)</Label>
            <Input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags separated by commas"
            />
          </FormGroup>

          <Button
            variant="primary"
            fullWidth
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} Photos`}
          </Button>
        </>
      )}
    </Modal>
  );
}