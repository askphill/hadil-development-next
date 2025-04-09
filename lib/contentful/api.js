import { IMAGE_QUERY_FIELDS, COMPONENT_LINK_QUERY } from './fragments';
import { logContentfulQueryErrors, delay } from '../utils/helpers';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID;

export const retryFetch = (url, options = {}, retries = 50, retryDelay = 2000) =>
  new Promise((resolve, reject) => {
    const fetchId =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const fetchWrapper = async retriesLeft => {
      try {
        const res = await fetch(url, options);
        if (res) {
          const status = res.status || 500;
          switch (status) {
            case 429: {
              const delayInMs =
                Number(res.headers.get('X-Contentful-RateLimit-Reset')) * 1000 || retryDelay;
              const retry = async () => {
                if (retriesLeft > 0) {
                  /* eslint-disable no-console */
                  console.log(
                    '\x1b[31m',
                    `fetch #${fetchId} failed with 429, retry in ${delayInMs}ms, iterations left ${retriesLeft}`
                  );
                  await delay(delayInMs);
                  fetchWrapper(retriesLeft - 1);
                } else {
                  const errorResponse = {
                    status: 500,
                    message: 'reached max amount of iterations, fetch failed with 429',
                  };
                  reject(errorResponse);
                }
              };
              retry();
              break;
            }
            case 200: {
              if (retriesLeft < retries) {
                console.log('\x1b[32m', `fetch #${fetchId} succeed`);
              }
              resolve(res);
              break;
            }
            default: {
              reject(res);
              break;
            }
          }
        }
      } catch (err) {
        reject(err);
      }
    };
    fetchWrapper(retries);
  });

export async function fetchContent(query, preview) {
  try {
    const res = await retryFetch(`https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${preview ? PREVIEW_TOKEN : ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
    const response = await res.json();
    return response.data;
  } catch (err) {
    if (err.json) {
      const response = await err.json();
      if (response.errors && response.errors instanceof Array) {
        logContentfulQueryErrors(response.errors, query);
        return {
          errors: response.errors,
          errorQuery: query,
        };
      }
      if (response.message) {
        /* eslint-disable no-console */
        console.log('\x1b[31m', 'Error with fetchContent: ', response.message);
        return {
          errors: [response.message],
          errorQuery: query,
        };
      }
      console.log('\x1b[31m', 'Error with fetchContent: ', response);
      return {
        errors: [response],
        errorQuery: query,
      };
    }
    console.log('\x1b[31m', 'Error with fetchContent: ', err);
    return {
      errors: [err],
      errorQuery: query,
    };
  }
}

export async function fetchAllLocales() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/locales`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const { items } = await res.json();

    const locales = items.map(locale => locale.code);

    return locales;
  } catch (error) {
    /* eslint-disable no-console */
    console.error('There was a problem retrieving locales');
    console.error(error);
    /* eslint-enable */
    return null;
  }
}

export async function fetchAllPagesWithSlug(locale) {
  const res = await fetchContent(`
  {
    pageGeneralCollection(where: { slug_exists: true }, locale: "${locale}") {
      items {
        slug
      }
    }
  }
  `);

  if (res) {
    const values = Object.values(res);
    const pages = values.map(page => page.items.map(item => ({ slug: item.slug, locale }))).flat();

    return pages;
  }

  // eslint-disable-next-line no-console
  console.error('Error returning fetchAllPagesWithSlug');
  return null;
}

export async function fetchPageType(slug, locale) {
  const res = await fetchContent(`
    {
      pageGeneralCollection( where: { slug: "${slug}" }, locale: "${locale}", limit: 1) {
        items {
          __typename
        }
      }
    }
    `);

  if (res) {
    const values = Object.values(res);
    const entry = values.filter(value => value.items.length > 0)[0];

    // eslint-disable-next-line no-underscore-dangle
    const type = entry?.items[0]?.__typename;

    return type;
  }
  // eslint-disable-next-line no-console
  console.error('Error returning getPageType');
  return null;
}

// fetch a specific page entry of a specific locale
export async function fetchLocalizedPage(type, locale, id) {
  const pageType = type.charAt(0).toLowerCase() + type.slice(1); // first letter lowercase

  const res = await fetchContent(`
    {
      ${pageType}(locale: "${locale}", id: "${id}") {
        slug
      }
    }
  `);

  if (res?.[pageType]) {
    const localizedPage = { slug: res[pageType].slug, locale };

    return localizedPage;
  }
  // eslint-disable-next-line no-console
  console.error(`Error returning ${pageType} entry for fetchLocalizedPage`);
  return null;
}

// fetch global-module
export async function fetchGlobal(type, locale, preview = false) {
  const resArray = [0, 60].map(async skip => {
    const res = await fetchContent(
      `
      {
        globalModuleCollection(where: {title_contains:"${type}"}, locale: "${locale}", preview: ${preview}, limit: 1) {
          items {
            sys {
              id
            }
            title
            resourcesCollection(skip: ${skip}, limit: 60) {
              items {
                name
                title
                source
                text
                richText {
                  json
                }
              }
            }
          }
        }
      }
    `,
      preview
    );

    return res;
  });

  const combinedRes = await Promise.all(resArray);

  if (combinedRes) {
    const reducedRes = combinedRes.reduce(
      (acc, cur) =>
        acc?.resourcesCollection
          ? {
              ...acc,
              resourcesCollection: {
                items: [
                  ...acc?.resourcesCollection?.items,
                  ...cur?.globalModuleCollection?.items?.[0]?.resourcesCollection?.items,
                ],
              },
            }
          : cur?.globalModuleCollection?.items?.[0],
      {}
    );
    return reducedRes;
  }

  // eslint-disable-next-line no-console
  console.error('Error returning Global');
  return null;
}
