import { useState } from 'react';
import PasswordValidator from 'password-validator';
import { encode } from 'shopify-gid';
import { useCustomer } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useResetPasswordCustomer = () => {
  const [state, setState] = useState({
    response: null,
    loading: false,
    error: null,
  });

  const { mutateCustomer } = useCustomer({
    redirectTo: '/account/',
    redirectIfFound: true,
  });

  const resetPassword = async (passwordField1, passwordField2, id, resetToken) => {
    setState({ response: null, loading: true, error: null });

    const schema = new PasswordValidator();

    schema.is().min(8).is().max(100).has().lowercase().has().uppercase();

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
    } else if (passwordField1 && resetToken && id) {
      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/reset-password', {
            method: 'POST',
            body: JSON.stringify({
              id: encode('Customer', id),
              input: {
                resetToken,
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
        error: 'The password, reset token, or customer id is missing.',
      });
    }
  };

  return [resetPassword, state];
};

export default useResetPasswordCustomer;
