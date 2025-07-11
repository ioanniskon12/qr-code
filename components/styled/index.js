// components/styled/index.js
'use client';

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Button = styled.button`
  padding: ${props => props.size === 'sm' ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  border: none;
  border-radius: 0.5rem;
  font-size: ${props => props.size === 'sm' ? '0.875rem' : '1rem'};
  font-weight: 500;
  transition: ${props => props.theme?.transitions?.default || 'all 0.3s ease'};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  ${props => props.variant === 'primary' && `
    background: var(--primary);
    color: white;
    
    &:hover:not(:disabled) {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: white;
    color: var(--primary);
    border: 2px solid var(--primary);
    
    &:hover:not(:disabled) {
      background: var(--primary);
      color: white;
    }
  `}
  
  ${props => props.variant === 'success' && `
    background: var(--success);
    color: white;
    
    &:hover:not(:disabled) {
      background: #059669;
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background: var(--danger);
    color: white;
    
    &:hover:not(:disabled) {
      background: #DC2626;
    }
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
    justify-content: center;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: ${props => props.radius || '1rem'};
  padding: ${props => props.padding || '2rem'};
  box-shadow: ${props => props.elevated ? 'var(--shadow-lg)' : 'var(--shadow)'};
  transition: var(--transition-default);
  
  ${props => props.hoverable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
  `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-${props => props.fill ? 'fill' : 'fit'}, 
    minmax(${props => props.minWidth || '300px'}, 1fr));
  gap: ${props => props.gap || '2rem'};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  &::placeholder {
    color: var(--gray);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

