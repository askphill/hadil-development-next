/* eslint-disable import/prefer-default-export */

import { COMPONENT_BUTTON } from './components';
import { IMAGE_QUERY_FIELDS } from './shared';

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
    image {
			${IMAGE_QUERY_FIELDS}
		}
    button {
     ${COMPONENT_BUTTON}            
    }
  }
`;

export const SECTION_TEXT = `
  ... on SectionText {
    __typename
    sys {
      id
    }
    textContent
    {
      json
    }
    textTitle
  }
`;
