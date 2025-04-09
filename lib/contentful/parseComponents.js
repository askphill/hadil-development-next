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
