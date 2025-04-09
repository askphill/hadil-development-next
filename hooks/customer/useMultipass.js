export const useMultipass = async (email, webUrl) => {
  try {
    const response = await fetch('/api/shopify/account/multipass', {
      method: 'POST',
      body: JSON.stringify({
        email,
        webUrl,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.url;
    }
    // eslint-disable-next-line no-console
    console.error('useMultipass failed: Check Shopify multipass secret and input');
    // if multipass doesn't work, we send oiginal webUrl
    return webUrl;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('useMultipass failed: ', error?.data?.error);
    return null;
  }
};

export default useMultipass;
