import useSWR from 'swr';
import fetchJson from 'lib/utils/fetchJson';
import { get, keys } from 'lib/utils/localStorage';
import { useRouter } from 'next/router';
import getNewCheckout from 'lib/shopify/getNewCheckout';

export function useCart() {
  const { locale } = useRouter();

  // Get initial cart from localstorage
  const id = get(keys.CHECKOUT);

  const { data, error } = useSWR(
    '/api/shopify/checkout/request/',
    async url => {
      let checkout;

      // if there is a checkout id fetch the checkout
      if (id) {
        try {
          checkout = await fetchJson(url, {
            method: 'POST',
            body: JSON.stringify(id),
          });
        } catch {
          // If there is an error with the checkout, generate a new one(cart expired as example)
          checkout = await getNewCheckout();
        }
      }

      // create new checkout when there is no id or a completed checkout
      if (checkout?.data?.completedAt || !id) {
        checkout = await getNewCheckout();
      }

      // Make sure to refetch a new cart if it was created more than 3 months from now;
      const createdAt = new Date(checkout.data.createdAt);
      const now = new Date();
      const differenceInTime = now.getTime() - createdAt.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays > 85) {
        checkout = await getNewCheckout();
      }

      return checkout;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    cart: { ...data?.data, webUrl: `${data?.data?.webUrl}&locale=${locale}` },
    error,
    isEmpty: !(data?.data?.lineItems?.edges?.length ?? 0),
  };
}

export default useCart;
