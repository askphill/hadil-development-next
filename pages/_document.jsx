/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import developmentGrid from 'styles/developmentGrid';

import segmentSnippet from 'lib/utils/segment';

class Site extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* favicon generator: https://realfavicongenerator.net */}
          {/* files in public/icons/ so make sure the href starts with /icons/ */}
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/icons/site.webmanifest" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <style>{developmentGrid()}</style>
        <body className="loading">
          <Main />
          <NextScript />
          {(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') && (
            <Script
              key="plugin-segment"
              dangerouslySetInnerHTML={{ __html: segmentSnippet }}
              strategy="afterInteractive"
            />
          )}
        </body>
      </Html>
    );
  }
}

export default Site;
