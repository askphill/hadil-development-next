const parseSEO = (SEO, href, slug, locale) => {
  const imageUrl = SEO?.image?.url;
  return {
    title: SEO?.title || '',
    description: SEO?.description || '',
    ogImage: imageUrl ? `${imageUrl}w=1200&h=600&fit=fill` : '',
    href,
    slug,
    locale,
  };
};

export default parseSEO;
