// app/scan/page.js
'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Container, Card, Button, Input } from '@/components/styled';
import { FiCamera, FiType } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

const ScannerSection = styled.section`
  padding: 4rem 0;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
`;

const ScanOptions = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ScanOption = styled.div`
  flex: 1;
  padding: 2rem;
  border: 2px solid ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.05)' : 'white'};
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 3rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }
`;

const CodeInput = styled(Input)`
  text-align: center;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const ScannerContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  
  video {
    width: 100%;
    border-radius: 0.5rem;
  }
`;

export default function ScanPage() {
  const [scanMethod, setScanMethod] = useState('camera');
  const [eventCode, setEventCode] = useState('');
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const handleScan = (data) => {
    if (data) {
      router.push(`/gallery/${data.text}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const submitCode = () => {
    if (eventCode) {
      router.push(`/gallery/${eventCode}`);
    }
  };

  return (
    <>
      <Navigation />
      <ScannerSection>
        <Container>
          <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Access Event Gallery
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--gray)' }}>
              Scan a QR code or enter the event code to view and upload photos
            </p>

            <ScanOptions>
              <ScanOption 
                active={scanMethod === 'camera'} 
                onClick={() => setScanMethod('camera')}
              >
                <FiCamera />
                <h4>Scan with Camera</h4>
                <p>Use your device camera</p>
              </ScanOption>
              <ScanOption 
                active={scanMethod === 'code'} 
                onClick={() => setScanMethod('code')}
              >
                <FiType />
                <h4>Enter Code</h4>
                <p>Type the event code</p>
              </ScanOption>
            </ScanOptions>

            {scanMethod === 'camera' ? (
              <ScannerContainer>
                {scanning && (
                  <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                )}
                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={() => setScanning(!scanning)}
                  style={{ marginTop: '1rem' }}
                >
                  {scanning ? 'Stop Scanning' : 'Start Scanner'}
                </Button>
              </ScannerContainer>
            ) : (
              <div>
                <CodeInput
                  type="text"
                  placeholder="Enter event code (e.g., EVT-2024-ABCD)"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && submitCode()}
                />
                <Button variant="primary" fullWidth onClick={submitCode}>
                  Access Gallery
                </Button>
              </div>
            )}
          </Card>
        </Container>
      </ScannerSection>
    </>
  );
}

