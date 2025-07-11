// ===== NAVIGATION COMPONENT =====
// components/Navigation.js
'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from './styled';
import { FiCamera } from 'react-icons/fi';

const Nav = styled.nav`
  background: white;
  box-shadow: var(--shadow);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--gray);
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary);
  }
`;

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <Nav>
      <NavContainer>
        <Logo href="/">
          <FiCamera size={24} />
          QRMemories
        </Logo>
        <NavLinks>
          <NavLink href="/scan">Scan QR</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          {session ? (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <Button variant="primary" size="sm" as={Link} href="/dashboard/events/new">
                Create Event
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" as={Link} href="/auth/signin">
              Sign In
            </Button>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}