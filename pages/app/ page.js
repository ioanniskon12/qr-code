// app/page.js
'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Button, Container, Grid, Card } from '@/components/styled';
import PricingCards from '@/components/PricingCards';
import { FiCamera, FiUpload, FiShare2 } from 'react-icons/fi';

const Hero = styled.section`
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeInUp 0.8s ease 0.2s both;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeInUp 0.8s ease 0.4s both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Features = styled.section`
  padding: 4rem 0;
  background: white;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  
  svg {
    font-size: 3rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 1rem;
  }
`;

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Hero>
        <Container>
          <HeroTitle>Share Memories with a Simple Scan</HeroTitle>
          <HeroSubtitle>
            The QR-code-first platform for event photo sharing. Perfect for weddings, birthdays, and special occasions.
          </HeroSubtitle>
          <HeroButtons>
            <Button variant="secondary" size="lg" as={Link} href="/scan">
              <FiCamera /> Scan QR Code
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              as={Link} 
              href="/auth/signup"
              style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid white' }}
            >
              Get Started Free
            </Button>
          </HeroButtons>
        </Container>
      </Hero>

      <Features>
        <Container>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
            How It Works
          </h2>
          <Grid minWidth="250px">
            <FeatureCard>
              <FiCamera />
              <h3>Scan QR Code</h3>
              <p>Guests scan your event's unique QR code to access the photo gallery</p>
            </FeatureCard>
            <FeatureCard>
              <FiUpload />
              <h3>Upload Photos</h3>
              <p>Everyone can contribute their photos to create a shared memory collection</p>
            </FeatureCard>
            <FeatureCard>
              <FiShare2 />
              <h3>Share Memories</h3>
              <p>View, download, and cherish all the moments captured by your guests</p>
            </FeatureCard>
          </Grid>
        </Container>
      </Features>

      <PricingCards />
    </>
  );
}