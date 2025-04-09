import { useState } from 'react';
import { useCustomer } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useLoginCustomer = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  // if customer is already logged in, redirect to account
  const { mutateCustomer } = useCustomer({
    redirectTo: '/account/',
    redirectIfFound: true,
  });

  const loginCustomer = async (email, password) => {
    if (email && password) {
      setState({ response: null, loading: true, error: null });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/login', {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('useLoginCustomer failed: ', error?.data?.error);
        setState({
          response: null,
          loading: false,
          error: error?.data?.error || 'Login email or password is incorrect',
        });
      }
    } else {
      setState({
        response: null,
        loading: false,
        error: 'Email or password is missing',
      });
    }
  };

  return [loginCustomer, state];
};

export default useLoginCustomer;
