// app/auth/signin/page.js
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, Input, Card, Container } from '@/components/styled';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light);
`;

const AuthCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border);
  }
  
  span {
    background: white;
    padding: 0 1rem;
    position: relative;
  }
`;

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <Container>
        <AuthCard>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h2>
          
          <Button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            style={{ 
              width: '100%', 
              marginBottom: '1.5rem',
              background: 'white',
              color: 'var(--dark)',
              border: '1px solid var(--border)'
            }}
          >
            <FcGoogle size={20} style={{ marginRight: '0.5rem' }} />
            Continue with Google
          </Button>

          <Divider>
            <span>or</span>
          </Divider>

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ marginBottom: '1rem' }}
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ marginBottom: '1.5rem' }}
            />
            
            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--gray)' }}>
            Dont have an account?{' '}
            <Link href="/auth/signup" style={{ color: 'var(--primary)' }}>
              Sign up
            </Link>
          </p>
        </AuthCard>
      </Container>
    </AuthContainer>
  );
}
