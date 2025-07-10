// components/Modal.js
'use client';

import styled, { keyframes } from 'styled-components';
import { FiX } from 'react-icons/fi';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: ${props => props.maxWidth || '500px'};
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray);
  transition: color 0.3s;
  
  &:hover {
    color: var(--dark);
  }
`;

export default function Modal({ isOpen, onClose, title, children, maxWidth }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent 
        onClick={(e) => e.stopPropagation()} 
        maxWidth={maxWidth}
      >
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </Overlay>
  );
}