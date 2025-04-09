import { fetchContent } from '../api';
import parseSEO from '../parseSEO';
import { IMAGE_QUERY_FIELDS } from '../fragments';

export const fetchProduct = async (slug, locale, preview) => {
  const res = await fetchContent(
    `
    {
        pageProductCollection(limit: 1, where: { slug: "${slug}" }, locale: "${locale}", preview: ${preview}) {
          items {
            sys {
              id
            }
            name
            title
            slug
            thumbnailImage {
                ${IMAGE_QUERY_FIELDS}
            }
            shopifyData
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

  if (res?.pageProductCollection.items) {
    const page = res.pageProductCollection.items[0]; // since we "limit: 1" entry

    return page;
  }

  // eslint-disable-next-line no-console
  console.error('Error returning pageProductCollection');
  return null;
};

export const parseProduct = (page, href, locale) => {
  const {
    sys,
    slug,
    title,
    seo,
    ...fields // extract this out of page, excluding the props above
  } = { ...page };

  // do your transformations to the page here

  const seoData = page.seo || {
    title: page.title,
    description: '',
    image: page.thumbnailImage,
  };

  return {
    title: page.title,
    slug: page.slug,
    locale,
    href,
    seo: parseSEO(seoData, href, page.slug, locale),
    ...fields,
  };
};
