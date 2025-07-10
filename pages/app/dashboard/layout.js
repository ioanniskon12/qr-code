// ===== DASHBOARD LAYOUT =====
// app/dashboard/layout.js
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '@/components/Navigation';
import DashboardSidebar from '@/components/DashboardSidebar';

const DashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

const DashboardContent = styled.main`
  flex: 1;
  padding: 2rem;
  background: var(--light);
`;

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Navigation />
      <DashboardContainer>
        <DashboardSidebar />
        <DashboardContent>{children}</DashboardContent>
      </DashboardContainer>
    </>
  );
}
