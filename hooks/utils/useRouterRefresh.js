import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useRouterRefresh = () => {
  // re-fetch props without refreshing the page
  const router = useRouter();

  return useCallback(() => router.replace(router.asPath), [router.asPath]);
};

export default useRouterRefresh;
