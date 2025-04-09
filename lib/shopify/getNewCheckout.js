import { set, keys } from 'lib/utils/localStorage';
import fetchJson from 'lib/utils/fetchJson';

export const getNewCheckout = async () => {
  const checkout = await fetchJson('/api/shopify/checkout/create', {
    method: 'POST',
  });
  // set new checkout id in local
  set(keys.CHECKOUT, checkout.data.id);
  return checkout;
};

export default getNewCheckout;
