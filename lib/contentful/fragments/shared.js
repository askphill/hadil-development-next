export const COMPONENT_LINK_QUERY = `
    text
    link {
        ... on PageGeneral {
            __typename
            slug
        }
        ... on PageProduct {
            __typename
            slug
        }
        ... on PageCollection {
            __typename
            slug
        }
    }
    externalLink
`;

export const IMAGE_QUERY_FIELDS = `
    title
    description
    contentType
    fileName
    size
    url
    width
    height
`;
