import fetchJson from 'lib/utils/fetchJson';
import { keys, get } from 'lib/utils/localStorage';
import { mutate } from 'swr';
import { useCart } from './useCart';

export function useUpdateItemQuantity() {
  const { cart } = useCart();

  async function updateItemQuantity(item) {
    // {variantId: lineItem.variant.id, quantity: quantity}

    const id = get(keys.CHECKOUT);

    if (!id) {
      throw new Error('Called updateItemQuantity too soon');
    }

    if (item.variantId == null) {
      throw new Error(`Missing variantId in item`);
    }
    if (item.quantity == null) {
      throw new Error(`Missing quantity in item with variant id: ${item.variantId}`);
    } else if (typeof item.quantity !== 'number') {
      throw new Error(`Quantity is not a number in item with variant id: ${item.variantId}`);
    } else if (item.quantity < 0) {
      throw new Error(`Quantity must not be negative in item with variant id: ${item.variantId}`);
    }

    async function replaceLineItem(lineItem) {
      const data = await fetchJson('/api/shopify/checkout/replace-items', {
        method: 'POST',
        body: JSON.stringify({
          checkoutId: id,
          lineItems: cart.lineItems.edges.reduce(
            (
              lineItems,
              {
                node: {
                  variant: { id: variantId },
                  quantity,
                  customAttributes,
                },
              }
            ) =>
              variantId === lineItem.variantId
                ? lineItems
                : [...lineItems, { variantId, quantity, customAttributes }],
            lineItem.quantity === 0 ? [] : [lineItem]
          ),
        }),
      });
      // Update cart
      await mutate('/api/shopify/checkout/request/', data, false);
      return data;
    }
    return replaceLineItem(item);
  }

  return updateItemQuantity;
}

export default useUpdateItemQuantity;
