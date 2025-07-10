// __tests__/pages/HomePage.test.js
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

describe('HomePage', () => {
  const renderWithProviders = (component) => {
    return render(
      <SessionProvider session={null}>
        {component}
      </SessionProvider>
    );
  };

  it('renders hero section', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/Share Memories with a Simple Scan/i)).toBeInTheDocument();
  });

  it('renders pricing cards', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Single Event')).toBeInTheDocument();
    expect(screen.getByText('Multiple Events')).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('Scan QR Code')).toBeInTheDocument();
    expect(screen.getByText('Get Started Free')).toBeInTheDocument();
  });
});
