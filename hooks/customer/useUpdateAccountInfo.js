import { useState } from 'react';
import { useCustomer, useRouterRefresh } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useUpdateAccountInfo = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  const { mutateCustomer } = useCustomer();

  const update = useRouterRefresh();

  const updateAccountInfo = async (customerAccessToken, customer) => {
    if (customerAccessToken && customer) {
      setState({ response: null, loading: true, error: null });

      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/update-account-info', {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerAccessToken,
              customer,
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
        update();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useUpdateAccountInfo failed: ', error);
        setState({
          response: null,
          loading: false,
          error: error?.data?.error || 'Update account info failed',
        });
      }
    } else {
      setState({
        response: null,
        loading: false,
        error: 'Missing customer or customerAccessToken',
      });
    }
  };

  return [updateAccountInfo, state];
};

export default useUpdateAccountInfo;
