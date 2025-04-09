import { useState } from 'react';
import PasswordValidator from 'password-validator';
import { encode } from 'shopify-gid';
import { useCustomer } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useActivateCustomer = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  const { mutateCustomer } = useCustomer({
    redirectTo: '/account/',
    redirectIfFound: true,
  });

  const schema = new PasswordValidator();

  schema.is().min(8).is().max(100).has().lowercase().has().uppercase();

  const activeCustomer = async (passwordField1, passwordField2, id, activationToken) => {
    if (!schema.validate(passwordField1)) {
      setState({
        response: null,
        loading: false,
        error:
          'Your password should be between 8 and 100 characters, and have at least one lowercase and one uppercase letter.',
      });
    } else if (passwordField1 !== passwordField2) {
      setState({
        response: null,
        loading: false,
        error: 'Passwords do not match.',
      });
    } else if (passwordField1 && passwordField2 && id && activationToken) {
      setState({ response: null, loading: true, error: null });

      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/activate', {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: encode('Customer', id),
              input: {
                activationToken,
                password: passwordField1,
              },
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
        console.error('useActivateCustomer failed: ', error?.data?.error);
        setState({
          response: null,
          loading: false,
          error: error?.data?.error || error.message || 'Activation failed',
        });
      }
    }
  };

  return [activeCustomer, state];
};

export default useActivateCustomer;
