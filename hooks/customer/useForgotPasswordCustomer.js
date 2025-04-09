import { useState } from 'react';
import { useCustomer } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useForgotPasswordCustomer = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  const { mutateCustomer } = useCustomer();

  const forgotPassword = async email => {
    if (email) {
      setState({ response: null, loading: true, error: null });
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/forgot-password', {
            method: 'POST',
            body: JSON.stringify({
              email,
            }),
          })
        );
        setState({
          response: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          response: null,
          loading: false,
          error: error?.data?.error || error.message,
        });
      }
    } else {
      setState({
        response: null,
        loading: false,
        error: 'Email is missing',
      });
    }
  };

  return [forgotPassword, state];
};

export default useForgotPasswordCustomer;
