import { useState } from 'react';
import { useCustomer } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useLogoutCustomer = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  const { mutateCustomer } = useCustomer({
    redirectTo: '/',
  });

  const logoutCustomer = async accessToken => {
    if (accessToken) {
      setState({ response: null, loading: true, error: null });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/logout', {
            method: 'POST',
            body: JSON.stringify({
              accessToken,
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState({
          response: null,
          loading: false,
          error: true,
        });
      }
    } else {
      setState({
        response: null,
        loading: false,
        error: true,
      });
    }
  };
  return [logoutCustomer, state];
};

export default useLogoutCustomer;
