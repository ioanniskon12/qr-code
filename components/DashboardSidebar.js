// components/DashboardSidebar.js
'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, 
  FiCalendar, 
  FiPlusCircle, 
  FiCreditCard, 
  FiSettings,
  FiLogOut 
} from 'react-icons/fi';
import { signOut } from 'next-auth/react';

const Sidebar = styled.aside`
  width: 250px;
  background: white;
  border-right: 1px solid var(--border);
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
`;

const SidebarItem = styled.li`
  margin-bottom: 0.5rem;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? 'var(--primary)' : 'var(--gray)'};
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  transition: all 0.3s;
  
  &:hover {
    background: var(--light);
    color: var(--primary);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: var(--danger);
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  transition: all 0.3s;
  
  &:hover {
    background: var(--light);
  }
`;

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: FiGrid, label: 'Overview', href: '/dashboard' },
    { icon: FiCalendar, label: 'My Events', href: '/dashboard/events' },
    { icon: FiPlusCircle, label: 'Create Event', href: '/dashboard/events/new' },
    { icon: FiCreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: FiSettings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <Sidebar>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarItem key={item.href}>
            <SidebarLink href={item.href} active={pathname === item.href}>
              <item.icon />
              {item.label}
            </SidebarLink>
          </SidebarItem>
        ))}
        <SidebarItem style={{ marginTop: '2rem' }}>
          <LogoutButton onClick={() => signOut()}>
            <FiLogOut />
            Logout
          </LogoutButton>
        </SidebarItem>
      </SidebarMenu>
    </Sidebar>
  );
}
