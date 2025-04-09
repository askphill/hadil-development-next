const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const shopifyConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
};

export const statusReturn = (code, body) => ({
  statusCode: code,
  headers,
  body: JSON.stringify(body),
});

export const preparePayload = (query, variables) => ({
  query,
  variables,
});
