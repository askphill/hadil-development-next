import { artDirectingImage, generateResponsiveImage } from 'lib/utils/helpers';
import { parseButton } from './parseComponents';

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
      case 'SectionCta':
        return array.push({
          title: section?.title,
          description: section?.description,
          subtitle: section?.subtitle,
          type,
          image: section.image && generateResponsiveImage(section.image),
          button: section.button && parseButton(section.button),
        });
      case 'SectionText':
        return array.push({
          textTitle: section?.textTitle,
          textContent: section?.textContent,
          type,
        });
      case 'SectionCarousel':
        return array.push({
          logos: section?.logoCollection?.items,
          type,
        });
      case 'SectionTeam':
        return array.push({
          membersTitle: section?.membersTitle,
          members: section?.membersCollection?.items,
          type,
        });
      case 'SectionMediaGrid':
        return array.push({
          media: section?.mediaCollection?.items,
          type,
        });
      case 'SectionContact':
        return array.push({
          formTitle: section?.formTitle,
          formText: section?.formText,
          formButton: section?.formButton,
          type,
        });
      default:
        return null;
    }
  });

  return array;
};

export default parseSections;
