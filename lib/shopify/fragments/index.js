export const VARIANT_QUERY = `
  availableForSale
  id
  title
  image {
    transformedSrc(preferredContentType: WEBP, maxWidth: 190)
  }
  selectedOptions {
    name
    value
  }
  priceV2 {
    amount
    currencyCode
  }
  product {
    id
    handle
  }
  sku
  weight
  weightUnit
`;

export const CHECKOUT_QUERY = `
  id
  note
  lineItemsSubtotalPrice {
    amount
  }
  lineItems(first: 250) {
    edges {
      node {
        id
        title
        customAttributes {
          key
          value
        }
        quantity
        variant {
          ${VARIANT_QUERY}
        }
      }
    }
  }
  currencyCode
  orderStatusUrl
  webUrl
  completedAt
  createdAt
`;
