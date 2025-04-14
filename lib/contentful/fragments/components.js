export const COMPONENT_LINK = `
linkCollection {
  items {
    ... on PageGeneral {
      __typename
      slug
    }
  }
}
`;

export const COMPONENT_BUTTON = `
  buttonText 
    link {
      externalLink
      ... on ComponentLink {
        ${COMPONENT_LINK}
      }
    }
`;
