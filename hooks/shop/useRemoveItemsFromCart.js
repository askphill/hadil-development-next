import fetchJson from 'lib/utils/fetchJson';
import { keys, get } from 'lib/utils/localStorage';
import { mutate } from 'swr';

export function useRemoveItemsFromCart() {
  async function removeItems(lineItemIds) {
    // ['lineItemIds']

    // get checkout ID
    const id = get(keys.CHECKOUT);

    if (!id) {
      throw new Error('Called addItemsToCart too soon');
    }

    if (lineItemIds.length < 1) {
      throw new Error('Must include at least one item to remove');
    }

    async function removeItemsFunction(itemsArray) {
      const data = await fetchJson('/api/shopify/checkout/remove-items', {
        method: 'POST',
        body: JSON.stringify({
          checkoutId: id,
          lineItemIds: itemsArray,
        }),
      });
      // Update cart
      await mutate('/api/shopify/checkout/request/');
      return data;
    }
    return removeItemsFunction(lineItemIds);
  }

  return removeItems;
}

export default useRemoveItemsFromCart;
