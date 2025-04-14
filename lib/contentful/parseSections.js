import { artDirectingImage, generateResponsiveImage } from 'lib/utils/helpers';
import { parseButton } from './parseComponents';

// ------------------------------- parse sections here -------------------------------

const parseSections = sections => {
  const array = [];
  sections?.map(section => {
    // eslint-disable-next-line no-underscore-dangle
    const type = section.__typename;
    console.log('section', section);

    switch (type) {
      case 'SectionHero':
        return array.push({
          title: section.title,
          image: artDirectingImage(section.imageMobile, section.imageDesktop),
          cta: section.cta,
          type,
        });
      case 'SectionCta':
        return array.push({
          title: section?.title,
          description: section?.description,
          subtitle: section?.subtitle,
          type: section?.type,
          button: parseButton(section.button),
        });
      default:
        return null;
    }
  });

  return array;
};

export default parseSections;
