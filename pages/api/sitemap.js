import { getAllPagesWithSlug } from 'lib/contentful';
import { fetchAllLocales } from 'lib/contentful/api';

const createSitemap = pages => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            ({ slug, locale }) => `
                    <url>
                        <loc>${`${process.env.NEXT_PUBLIC_SITEURL}/${locale}/${
                          slug === '/' ? '' : `${slug}/`
                        }`}</loc>
                    </url>
                `
          )
          .join('')}
    </urlset>
    `;

export default async (req, res) => {
  const allLocales = await fetchAllLocales();
  const pagesArray = await Promise.all(allLocales.map(locale => getAllPagesWithSlug(locale)));
  const pages = pagesArray.flat();

  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap(pages));
  res.end();
};
