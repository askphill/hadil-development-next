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

export const SECTION_CAROUSEL = `
  ... on SectionCarousel {
    __typename
    sys {
      id
    }
    logoCollection {
      items {
        ... on Asset {
          ${IMAGE_QUERY_FIELDS}
        }
      }
    }
  }
`;

export const SECTION_TEAM = `
  ... on SectionTeam {
    __typename
    sys {
      id
    }
    membersTitle
    membersCollection {
      items {
       ... on ComponentMember {
          _id
          memberName
          memberPhoto {
            ${IMAGE_QUERY_FIELDS}
          }
          company
        }
      }
    }
  }
`;

export const SECTION_MEDIAGRID = `
  ... on SectionMediaGrid {
    __typename
    sys {
      id
    }
    mediaCollection {
      items {
        ... on Asset {
          ${IMAGE_QUERY_FIELDS}
        }
      }
    }
  }
`;
export const SECTION_CONTACT = `
  ... on SectionContact {
    __typename
    sys {
      id
    }
    formTitle {
     json
    }
    formText {
      json
     }
    formButton {
     ${COMPONENT_BUTTON}            
    }
  }
`;
