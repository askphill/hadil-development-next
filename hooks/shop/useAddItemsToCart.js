import fetchJson from 'lib/utils/fetchJson';
import { keys, get } from 'lib/utils/localStorage';
import { mutate } from 'swr';

export function useAddItemsToCart() {
  async function addItems(items) {
    // [{quantity: quantity, variantId: 'variantId'}]
    const id = get(keys.CHECKOUT);

    if (!id) {
      throw new Error('No Active checkout');
    }

    if (items.length < 1) {
      throw new Error('Must include at least one line item, empty line items found');
    }

    items.forEach(item => {
      if (item.variantId == null) {
        throw new Error(`Missing variantId in item`);
      }

      if (item.quantity == null) {
        throw new Error(`Missing quantity in item with variant id: ${item.variantId}`);
      } else if (typeof item.quantity !== 'number') {
        throw new Error(`Quantity is not a number in item with variant id: ${item.variantId}`);
      } else if (item.quantity < 1) {
        throw new Error(
          `Quantity must not be less than one in item with variant id: ${item.variantId}`
        );
      }
    });

    async function addLineItems(itemsArray) {
      const data = await fetchJson('/api/shopify/checkout/add-items', {
        method: 'POST',
        body: JSON.stringify({
          checkoutId: id,
          lineItems: itemsArray,
        }),
      });
      // Update cart

      await mutate('/api/shopify/checkout/request/', data, false);
      return data;
    }

    return addLineItems(items);
  }

  return addItems;
}

export default useAddItemsToCart;
