import 'styles/reset.scss';
import 'styles/globals.scss';
import 'styles/chrome-bug.scss';

import { useEffect } from 'react';

import { useTracking } from 'hooks';
import { UIContextProvider } from 'contexts/UIContext';

function MyApp({ Component, pageProps, router }) {
  const track = useTracking();

  // eslint-disable-next-line no-unused-expressions
  typeof window !== 'undefined' &&
    track({
      type: 'page',
      name: pageProps?.page?.name || '',
      data: {
        title: pageProps?.page?.seo?.title,
        path: router?.asPath,
        referrer: '', // TO DO
        url: window?.location?.href,
        search: window?.location?.search,
      },
    });

  useEffect(() => {
    // Chrome css bug
    document.body.classList?.remove('loading');
  }, []);

  return (
    <UIContextProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </UIContextProvider>
  );
}

export default MyApp;
