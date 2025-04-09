export const keys = {
  CHECKOUT: `checkout_id::${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
  USER: `shopify_local_user::${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
};

export function set(key, value) {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.localStorage.setItem(key, value);
  }
}

export function remove(key) {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.localStorage.removeItem(key);
  }
}

export function get(key) {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item;
  } catch {
    return null;
  }
}
