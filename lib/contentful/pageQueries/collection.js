import { fetchContent } from '../api';
import parseSEO from '../parseSEO';
import { IMAGE_QUERY_FIELDS } from '../fragments';

export const fetchCollection = async (slug, locale, preview) => {
  const res = await fetchContent(
    `
        {
          pageCollectionCollection(limit: 1, where: { slug: "${slug}" }, locale: "${locale}", preview: ${preview}) {
            items {
              sys {
                id
              }
              name
              title
              slug
              productsCollection {
                items {
                  title
                  slug
                  shopifyData
                  thumbnailImage {
                    ${IMAGE_QUERY_FIELDS}
                  }
                }
              }
              seo {
                title
                description
                image {
                  ${IMAGE_QUERY_FIELDS}
                }    
              }
            }
          }
        }
        `,
    preview
  );

  if (res?.errors) {
    return res;
  }

  if (res?.pageCollectionCollection.items) {
    const page = res.pageCollectionCollection.items[0]; // since we "limit: 1" entry

    return page;
  }

  // eslint-disable-next-line no-console
  console.error('Error returning pageCollectionCollection');
  return null;
};

export const parseCollection = (page, href, locale) => {
  const {
    sys,
    title,
    slug,
    productsCollection,
    seo,
    ...fields // extract this out of page, excluding the props above
  } = { ...page };

  // do your transformations to the page here

  const seoData = page.seo || { title: page.title, description: '', image: '' };

  return {
    title: page.title,
    slug: page.slug,
    products: productsCollection.items,
    locale,
    href,
    seo: parseSEO(seoData, href, page.slug, locale),
    ...fields,
  };
};
