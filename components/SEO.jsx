import Head from 'next/head';

const siteName = process.env.NEXT_PUBLIC_SITENAME;
const siteUrl = process.env.NEXT_PUBLIC_SITEURL;

const SEO = ({ seo }) => {
  const title = seo ? seo?.title : siteName;
  const description = seo ? seo.description : '';
  const ogImage = seo ? seo?.ogImage : '';
  const url = seo?.slug ? `${siteUrl}/${seo?.locale}/${seo.slug === '/' ? '' : seo.slug}` : '';
  const locale = seo ? seo?.locale : '';

  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="Accept-CH" content="DPR, Width, Viewport-Width" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content={description} />
      <meta name="image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={locale} />
      {url && <link rel="canonical" href={url} />}
      {seo?.href &&
        seo?.href
          .filter(({ locale: hrefLocale }) => hrefLocale !== locale)
          .map(({ locale: hrefLocale, slug }) => (
            <link
              key={hrefLocale}
              rel="alternate"
              hrefLang={hrefLocale}
              href={`${siteUrl}/${hrefLocale}/${slug === '/' ? '' : slug}`}
            />
          ))}
    </Head>
  );
};

export default SEO;
