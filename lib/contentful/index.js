import { camelize } from 'lib/utils/helpers';
import {
  fetchAllLocales,
  fetchPageType,
  fetchLocalizedPage,
  fetchAllPagesWithSlug,
  fetchGlobal,
} from './api';

import { fetchGeneral, parseGeneral } from './pageQueries/general';
import { fetchProduct, parseProduct } from './pageQueries/product';
import { fetchCollection, parseCollection } from './pageQueries/collection';
import { parseResource } from './parseComponents';

export const getPageType = async (slug, locale) => {
  const type = await fetchPageType(slug, locale);
  return type;
};

export const getAllPagesWithSlug = async locale => {
  const pages = await fetchAllPagesWithSlug(locale);
  return pages;
};

const getHref = async (type, id) => {
  const allLocales = await fetchAllLocales();
  const mapLocaleData = allLocales.map(async locale => {
    const href = await fetchLocalizedPage(type, locale, id);
    return href;
  });
  const allhrefPages = await Promise.all(mapLocaleData);
  return allhrefPages;
};

export const getPage = async (type, slug, locale, preview) => {
  let href;
  let page;

  switch (type) {
    case 'PageGeneral':
      page = await fetchGeneral(slug, locale, preview);
      if (page.errors) {
        return page;
      }
      if (page.sys) {
        href = await getHref(type, page.sys.id);
        return parseGeneral(page, href, locale);
      }
      return null;
    default:
      return null;
  }
};

export const getGlobal = async (types, locale, preview) => {
  const parseGlobalResources = (resources, prefixToRemove) =>
    resources.reduce((accumulator, data) => {
      const name = camelize(data.title.replace(prefixToRemove, ''));
      accumulator[name] = parseResource(data);
      return accumulator;
    }, {});

  const globals = await Promise.all(types.map(async type => fetchGlobal(type, locale, preview)));

  const globalData = await globals.reduce((accumulator, global) => {
    const { title: type } = global;
    const resources = global.resourcesCollection.items;
    accumulator[type] = parseGlobalResources(resources, `${type} - `);
    return accumulator;
  }, {});

  return globalData;
};
