import SEO from 'components/SEO';
import { getPageType, getPage } from 'lib/contentful';
import PageGeneral from 'components/pages/general';
import Layout from 'components/layout';
import PageFiveHundred from 'components/pages/fiveHundred';

// eslint-disable-next-line arrow-body-style
const Home = ({ page, error, previewData }) => {
  // if (error) {
  //   return <PageFiveHundred data={page} />;
  // }

  return (
    // <Layout previewData={previewData}>
    <>
      <div
        style={{
          fontSize: '10rem',
          width: '100rem',
          height: '50rem',
          margin: '0 auto',
          backgroundColor: 'red',
        }}
      >
        Hello World
      </div>
      {/* {page?.seo && <SEO seo={page.seo} />} */}
      {/* <PageGeneral data={page} /> */}
    </>
    // </Layout>
  );
};

export async function getStaticProps({ locale, preview = false, previewData = null }) {
  const type = await getPageType('/', locale);

  const page = await getPage(type, '/', locale, preview);

  if (page.errors) {
    return {
      props: { page, error: true, previewData },
    };
  }

  return {
    props: { page, previewData },
    revalidate: 1,
  };
}

export default Home;
