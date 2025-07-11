// app/dashboard/events/new/page.js
'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, FormGroup, Label } from '@/components/styled';
import { toast } from 'react-toastify';

const Form = styled.form`
  max-width: 600px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input {
    width: auto;
  }
`;

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    expiration: '30days',
    isPasswordProtected: false,
    password: '',
    allowGuestUploads: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const event = await response.json();
        toast.success('Event created successfully!');
        router.push(`/dashboard/events/${event.id}/qr`);
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      toast.error('Error creating event');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <h1 style={{ marginBottom: '1rem' }}>Create New Event</h1>
      <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
        Set up a new photo sharing event with QR code access
      </p>

      <Card>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Event Name</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., John's 30th Birthday"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell guests about this event..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Event Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Expiration</Label>
            <Select
              name="expiration"
              value={formData.expiration}
              onChange={handleChange}
            >
              <option value="30days">30 days (Free)</option>
              <option value="1year">1 year (Premium)</option>
              <option value="never">Never expire (Premium)</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Checkbox>
              <input
                type="checkbox"
                name="isPasswordProtected"
                checked={formData.isPasswordProtected}
                onChange={handleChange}
              />
              Password protect this event
            </Checkbox>
          </FormGroup>

          {formData.isPasswordProtected && (
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password for event access"
                required={formData.isPasswordProtected}
              />
            </FormGroup>
          )}

          <FormGroup>
            <Checkbox>
              <input
                type="checkbox"
                name="allowGuestUploads"
                checked={formData.allowGuestUploads}
                onChange={handleChange}
              />
              Allow guest uploads
            </Checkbox>
          </FormGroup>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event & Generate QR'}
          </Button>
        </Form>
      </Card>
    </>
  );
}