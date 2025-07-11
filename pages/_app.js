// pages/_app.js
import "@/styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from '@/styles/GlobalStyles';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <GlobalStyles />
        <Component {...pageProps} />
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ErrorBoundary>
    </SessionProvider>
  );
}