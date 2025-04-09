import { shopifyConfig, preparePayload } from 'lib/shopify';

const { NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_API_VERSION } = process.env;

const CUSTOMER_ADDRESS_QUERY = `
  id
  firstName
  lastName
  address1
  address2
  company
  phone
  city
  country
  province
  zip
`;

const CUSTOMER_QUERY = `query customerQuery($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    firstName
    lastName
    acceptsMarketing
    phone
    email
    tags
    defaultAddress {
      ${CUSTOMER_ADDRESS_QUERY}
    }
    addresses(first: 100) {
      edges {
        node {
          ${CUSTOMER_ADDRESS_QUERY}
        }
      }
    }
    orders(first:100){
      edges{
        node{
          orderNumber
          totalPrice
          processedAt
          statusUrl
          successfulFulfillments(first: 100){
            trackingInfo(first: 100){
              number
              url
            }
          }
          lineItems(first:100){
            edges{
              node{
                customAttributes {
                  key
                  value
                }
                quantity
                title
                variant{
                  title
                  price
                  image{
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const getUpdatedCustomer = async customerAccessToken => {
  if (!customerAccessToken) {
    // eslint-disable-next-line no-console
    console.error('Missing argument: customerAccessToken');
    return null;
  }

  const payloadCustomer = preparePayload(CUSTOMER_QUERY, {
    customerAccessToken,
  });

  try {
    const customerRes = await fetch(
      `https://${NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}.myshopify.com/api/${NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql`,
      {
        method: 'POST',
        headers: shopifyConfig,
        body: JSON.stringify(payloadCustomer),
      }
    );

    const { data: customerData } = await customerRes.json();

    if (customerRes.ok) {
      const {
        firstName,
        lastName,
        orders,
        defaultAddress,
        addresses,
        tags,
        email,
      } = customerData.customer;

      const customer = {
        isLoggedIn: true,
        firstName,
        lastName,
        orders,
        email,
        defaultAddress,
        addresses,
        tags,
      };

      return customer;
    }

    // eslint-disable-next-line no-console
    console.error('Error at updateCustomer.js: Server error');
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error at updateCustomer.js: ', error.message);
    return null;
  }
};

export default getUpdatedCustomer;
