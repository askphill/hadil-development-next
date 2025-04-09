// use for all images except when there are separate mobile and desktop images
export const generateResponsiveImage = image => {
  if (image !== undefined) {
    return {
      baseUrl: image.url,
      contentType: image.contentType,
      title: image.title,
      width: image.width,
      height: image.height,
    };
  }
  return {
    title: image.title,
  };
};

export const artDirectingImage = (mobile, desktop) => {
  const imageMobile = mobile ? generateResponsiveImage(mobile) : '';
  const imageDesktop = desktop ? generateResponsiveImage(desktop) : '';

  const image = {
    mobile: imageMobile || '',
    desktop: imageDesktop || '',
  };

  return image;
};

export const formatPrice = (price, currency = 'EUR') =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).format(price);

export const logContentfulQueryErrors = (errorsArray, query) => {
  errorsArray.forEach(({ message }) =>
    /* eslint-disable no-console */
    console.log(
      '\x1b[31m',
      `
      - ERROR

      - MESSAGE:
        ${message}

      - QUERY:
        ${query}


      `
    )
  );
};

export const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const camelize = str =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
