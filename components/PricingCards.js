// components/PricingCards.js
'use client';

import styled from 'styled-components';
import { Container, Grid, Card, Button } from './styled';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const PricingSection = styled.section`
  padding: 4rem 0;
  background: var(--light);
`;

const PricingCard = styled(Card)`
  text-align: center;
  position: relative;
  border: 2px solid ${props => props.popular ? 'var(--primary)' : 'var(--border)'};
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary);
  margin: 1rem 0;
  
  span {
    font-size: 1rem;
    color: var(--gray);
  }
`;

const Features = styled.ul`
  list-style: none;
  margin: 2rem 0;
`;

const Feature = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    color: var(--success);
  }
`;

export default function PricingCards() {
  const router = useRouter();

  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: '/forever',
      features: [
        'Up to 5 QR codes',
        '100 photos per event',
        '30 days storage',
        'Basic galleries',
        'Guest uploads'
      ],
      action: 'Start Free',
      variant: 'secondary'
    },
    {
      name: 'Single Event',
      price: '€100',
      period: '/event',
      features: [
        '1 premium event',
        '500 photo uploads',
        '1 year storage',
        'Password protection',
        'Download enabled',
        'Advanced sharing'
      ],
      action: 'Get Started',
      variant: 'primary',
      popular: true
    },
    {
      name: 'Multiple Events',
      price: '€200',
      period: '/year',
      features: [
        'Unlimited QR codes',
        'Unlimited uploads',
        'Extended storage',
        'Admin dashboard',
        'Analytics & insights',
        'Priority support'
      ],
      action: 'Go Premium',
      variant: 'success'
    }
  ];

  const selectPlan = (planName) => {
    router.push(`/auth/signup?plan=${planName.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <PricingSection>
      <Container>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
          Choose Your Plan
        </h2>
        <Grid>
          {plans.map((plan) => (
            <PricingCard key={plan.name} popular={plan.popular}>
              {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
              <h3>{plan.name}</h3>
              <Price>
                {plan.price}<span>{plan.period}</span>
              </Price>
              <Features>
                {plan.features.map((feature, index) => (
                  <Feature key={index}>
                    <FiCheck />
                    {feature}
                  </Feature>
                ))}
              </Features>
              <Button 
                variant={plan.variant} 
                fullWidth
                onClick={() => selectPlan(plan.name)}
              >
                {plan.action}
              </Button>
            </PricingCard>
          ))}
        </Grid>
      </Container>
    </PricingSection>
  );
}
