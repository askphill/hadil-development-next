import { getPage, getAllPagesWithSlug, getPageType } from 'lib/contentful';
import { fetchAllLocales } from 'lib/contentful/api';
import SEO from 'components/SEO';
import PageGeneral from 'components/pages/general';
import PageFiveHundred from 'components/pages/fiveHundred';
import Layout from 'components/layout';

export default function Page({ page, type, previewData }) {
  const renderPageContent = () => {
    switch (type) {
      case 'PageGeneral':
        return <PageGeneral data={page} />;
      case '500':
        return <PageFiveHundred data={page} />;
      default:
        return <div>{`Cannot find page type ${type}`}</div>;
    }
  };
  return (
    <Layout previewData={previewData}>
      <>
        {page?.seo && <SEO seo={page.seo} />}
        {renderPageContent()}
      </>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, preview = false, previewData = null }) {
  const { slug } = params;

  const type = await getPageType(slug, locale);

  const page = await getPage(type, slug, locale, preview);

  if (page.errors) {
    return {
      props: { page, type: '500', previewData },
    };
  }

  return {
    props: { page, type, previewData },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const allLocales = await fetchAllLocales();

  const pagesArray = await Promise.all(allLocales.map(locale => getAllPagesWithSlug(locale)));
  const allPages = pagesArray.flat();

  return {
    paths: allPages
      ?.filter(({ slug }) => slug !== '/')
      ?.map(({ slug, locale }) => ({ params: { slug }, locale })),
    fallback: false,
  };
}
