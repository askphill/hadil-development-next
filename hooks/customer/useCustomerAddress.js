import { useState } from 'react';
import { useCustomer, useRouterRefresh } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useCustomerAddress = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  const update = useRouterRefresh();

  const { mutateCustomer } = useCustomer();

  const createAddress = async (customerAccessToken, address) => {
    if (customerAccessToken && address) {
      setState({
        response: null,
        loading: true,
        error: null,
      });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/update-address', {
            method: 'POST',
            body: JSON.stringify({
              customerAccessToken,
              address,
              action: 'CREATE',
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
        update(); // re-fetch props without refreshing the page
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useCustomerAddress failed: ', error);

        setState({
          response: true,
          loading: false,
          error: error?.data?.error || 'Create address failed',
        });
      }
    } else {
      setState({
        response: true,
        loading: false,
        error: 'Missing customerAccessToken or address',
      });
    }
  };

  const updateDefaultAddress = async (customerAccessToken, id) => {
    if (customerAccessToken && id) {
      setState({
        response: null,
        loading: true,
        error: null,
      });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/update-address', {
            method: 'POST',
            body: JSON.stringify({
              customerAccessToken,
              id,
              action: 'DEFAULT_UPDATE',
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
        update(); // re-fetch props without refreshing the page
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useCustomerAddress failed: ', error);

        setState({
          response: true,
          loading: false,
          error: error?.data?.error || 'Update default address failed',
        });
      }
    } else {
      setState({
        response: true,
        loading: false,
        error: 'Missing customerAccessToken or address id',
      });
    }
  };

  const deleteAddress = async (customerAccessToken, id) => {
    if (customerAccessToken && id) {
      setState({
        response: null,
        loading: true,
        error: null,
      });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/update-address', {
            method: 'POST',
            body: JSON.stringify({
              customerAccessToken,
              id,
              action: 'DELETE',
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
        update(); // re-fetch props without refreshing the page
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useCustomerAddress failed: ', error);
        setState({
          response: true,
          loading: false,
          error: error?.data?.error || 'Delete address failed',
        });
      }
    } else {
      setState({
        response: true,
        loading: false,
        error: 'Missing customerAccessToken or address id',
      });
    }
  };
  const updateAddress = async (customerAccessToken, id, address) => {
    if (customerAccessToken && id && address) {
      setState({
        response: null,
        loading: true,
        error: null,
      });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/update-address', {
            method: 'POST',
            body: JSON.stringify({
              customerAccessToken,
              id,
              address,
              action: 'UPDATE',
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
        update(); // re-fetch props without refreshing the page
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useCustomerAddress failed: ', error);
        setState({
          response: true,
          loading: false,
          error: error?.data?.error || 'Update address failed',
        });
      }
    } else {
      setState({
        response: true,
        loading: false,
        error: 'Missing customerAccessToken, address id, or address',
      });
    }
  };

  return [{ createAddress, updateDefaultAddress, deleteAddress, updateAddress }, state];
};

export default useCustomerAddress;
