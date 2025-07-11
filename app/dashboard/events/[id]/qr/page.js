// app/dashboard/events/[id]/qr/page.js
'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from '@/components/styled';
import { QRCodeCanvas } from 'qrcode.react';
import { FiDownload, FiCopy, FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const QRContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const QRWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  display: inline-block;
  margin: 2rem 0;
`;

const QRActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const CodeDisplay = styled.div`
  background: var(--light);
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 1.25rem;
  margin: 1rem 0;
  color: var(--primary);
`;

export default function QRCodePage({ params }) {
  const [event, setEvent] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    fetchEventData();
  }, [params.id]);

  const fetchEventData = async () => {
    try {
      const response = await fetch(`/api/events/${params.id}/qr`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data.event);
        setQrCode(data.qrCode);
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  const downloadQR = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${event.title}-QR.png`;
    link.href = url;
    link.click();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(qrCode.code);
    toast.success('Code copied to clipboard!');
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Join my event: ${event.title}`,
          url: qrCode.url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  if (!event || !qrCode) {
    return <div>Loading...</div>;
  }

  return (
    <QRContainer>
      <h1>{event.title}</h1>
      <p style={{ color: 'var(--gray)' }}>
        Share this QR code with your guests to let them upload and view photos
      </p>

      <Card>
        <QRWrapper>
          <QRCodeCanvas
            value={qrCode.url}
            size={256}
            fgColor="#6366F1"
            level="H"
          />
        </QRWrapper>

        <CodeDisplay>{qrCode.code}</CodeDisplay>

        <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
          Event URL: <a href={qrCode.url} target="_blank" rel="noopener noreferrer">
            {qrCode.url}
          </a>
        </p>

        <QRActions>
          <Button variant="primary" onClick={downloadQR}>
            <FiDownload /> Download QR
          </Button>
          <Button variant="secondary" onClick={copyCode}>
            <FiCopy /> Copy Code
          </Button>
          {navigator.share && (
            <Button variant="secondary" onClick={shareQR}>
              <FiShare2 /> Share
            </Button>
          )}
        </QRActions>
      </Card>
    </QRContainer>
  );
}