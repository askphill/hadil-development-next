import { IMAGE_QUERY_FIELDS, COMPONENT_LINK_QUERY } from './shared';

export const SECTION_HERO_QUERY = `
  ... on SectionHero {
    __typename
    sys {
      id
    }
    title
    imageDesktop {
      ${IMAGE_QUERY_FIELDS}
    }
    imageMobile {
      ${IMAGE_QUERY_FIELDS}
    }
    cta {
      ${COMPONENT_LINK_QUERY}
    }
  }
`;
