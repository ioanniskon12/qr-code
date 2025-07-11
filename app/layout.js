import StyledComponentsRegistry from './registry';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { Providers } from '@/components/Providers';

export const metadata = {
  title: 'QRMemories - Event Photo Sharing Platform',
  description: 'Share event photos with a simple QR code scan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <GlobalStyles />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
