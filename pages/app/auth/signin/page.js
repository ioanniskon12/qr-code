// app/auth/signin/page.js
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { Container, Card, Button, Input, FormGroup, Label } from '@/components/styled';
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

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
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
  
  span {
    padding: 0 1rem;
    color: var(--gray);
    font-size: 0.875rem;
  }
`;

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false
    });

    if (result?.error) {
      alert('Invalid credentials');
    } else {
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <AuthContainer>
      <Container>
        <AuthCard>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Welcome Back
          </h2>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            style={{ marginBottom: '1rem' }}
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <Divider>
            <span>or</span>
          </Divider>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--gray)' }}>
            Don't have an account?{' '}
            <Link href="/auth/signup" style={{ color: 'var(--primary)' }}>
              Sign up
            </Link>
          </p>
        </AuthCard>
      </Container>
    </AuthContainer>
  );
}