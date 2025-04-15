import { fetchContent } from '../api';
import parseSections from '../parseSections';
import { SECTION_CAROUSEL, SECTION_CTA, SECTION_TEXT, SECTION_TEAM } from '../fragments';

export const fetchGeneral = async (slug, locale, preview) => {
  const res = await fetchContent(
    `
        {
          pageGeneralCollection(limit: 1, where: { slug: "${slug}" }, locale: "${locale}", preview: ${preview}) {
            items {
              sys {
                id
              }
              name
              slug
              sectionsCollection (limit: 20) {
               items {
                 ${SECTION_CTA}
                 ${SECTION_TEXT}
                 ${SECTION_CAROUSEL}
                 ${SECTION_TEAM}
               }
             }
            }
          }
        }
        `,
    preview
  );

  if (res.errors) {
    return res;
  }

  if (res?.pageGeneralCollection.items) {
    const page = res.pageGeneralCollection.items[0]; // since we "limit: 1" entry
    return page;
  }

  // eslint-disable-next-line no-console
  console.error('Error returning pageGeneralCollection');
  return null;
};

export const parseGeneral = (page, href, locale) => {
  const {
    sys,
    slug,
    sectionsCollection,
    seo,
    ...fields // extract this out of page, excluding the props above
  } = { ...page };

  // do your transformations to the page here

  // const seoData = page.seo || { title: '', description: '', image: '' };

  return {
    slug: page.slug,
    locale,
    sections: parseSections(page.sectionsCollection.items),
    href,
    // seo: parseSEO(seoData, href, page.slug, locale),
    ...fields,
  };
};

// section and seo query
