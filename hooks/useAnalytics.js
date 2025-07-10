// hooks/useAnalytics.js
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    analytics.page(pathname);
  }, [pathname]);

  return analytics;
}
