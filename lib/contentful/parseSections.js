import { artDirectingImage, generateResponsiveImage } from 'lib/utils/helpers';

// ------------------------------- parse sections here -------------------------------

const parseSections = sections => {
  const array = [];
  sections?.map(section => {
    // eslint-disable-next-line no-underscore-dangle
    const type = section.__typename;
    switch (type) {
      case 'SectionHero':
        return array.push({
          title: section.title,
          image: artDirectingImage(section.imageMobile, section.imageDesktop),
          cta: section.cta,
          type,
        });
      default:
        return null;
    }
  });

  return array;
};

export default parseSections;
