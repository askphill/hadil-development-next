/* eslint-disable import/prefer-default-export */

import { COMPONENT_BUTTON } from './components';

export const SECTION_CTA = `
  ... on SectionCta {
    __typename
    sys {
      id
    }
    title {
      json
    }
    subtitle
    description
    type
    button {
     ${COMPONENT_BUTTON}            
    }
  }
`;
