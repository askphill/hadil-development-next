const parseLink = linkData => {
  // Check if external link
  if (linkData?.externalLink) {
    return {
      externalLink: linkData.externalLink,
      type: 'external',
    };
  }

  return { slug: linkData.link.slug, type: 'internal' };
};

export const parseButton = button => {
  const { buttonText, link } = button;
  return {
    buttonText,
    link: link ? parseLink(link) : '',
  };
};

export const parseResource = resource => {
  const { source, title, richText } = resource;
  switch (source) {
    case 'text':
      return {
        title,
        source,
        text: resource.text,
      };

    case 'rich-text':
      return {
        title,
        source,
        text: richText,
      };

    default:
      return {
        resource,
      };
  }
};

export const parseResources = resources => {
  const array = [];

  resources?.map(resource => array.push(parseResource(resource)));

  return array;
};
