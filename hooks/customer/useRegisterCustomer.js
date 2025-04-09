// import { useState } from 'react';
// import PasswordValidator from 'password-validator';
// import { useSetCustomer } from './useSetCustomer';

// export const useRegisterCustomer = () => {
//   const setCustomer = useSetCustomer();
//   const [state, setState] = useState({
//     response: null,
//     loading: false,
//     error: null,
//   });

//   const schema = new PasswordValidator();

//   schema.is().min(8).is().max(100).has().lowercase().has().uppercase();

//   const registerCustomer = async (email, passwordField1, passwordField2, firstName, lastName) => {
//     if (!schema.validate(passwordField1)) {
//       setState({
//         response: null,
//         loading: false,
//         error: 'Password invalid',
//       });
//     } else if (passwordField1 !== passwordField2) {
//       setState({
//         response: null,
//         loading: false,
//         error: 'Passwords do not match',
//       });
//     } else if (email && passwordField1 && firstName && lastName) {
//       setState({ response: null, loading: true, error: null });
//       try {
//         const data = await fetch(`/api/shopify/account/register`, {
//           method: 'POST',
//           body: JSON.stringify({
//             email,
//             password: passwordField1,
//             firstName,
//             lastName,
//           }),
//         });

//         const res = await data.json();
//         if (res.error) {
//           setState({
//             response: null,
//             loading: false,
//             error: res.error,
//           });
//         } else {
//           setCustomer(res, email);
//           setState({
//             response: res,
//             loading: false,
//             error: null,
//           });
//         }
//       } catch (error) {
//         setState({
//           response: null,
//           loading: false,
//           error,
//         });
//       }
//     } else {
//       setState({
//         response: null,
//         loading: false,
//         error: 'Missing customer input',
//       });
//     }
//   };

//   return [registerCustomer, state];
// };

// export default useRegisterCustomer;

// --------------------------------------------------

import { useState } from 'react';
import PasswordValidator from 'password-validator';
import { useCustomer } from 'hooks';
import fetchJson from 'lib/utils/fetchJson';

export const useRegisterCustomer = () => {
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

  const registerCustomer = async (email, passwordField1, passwordField2, firstName, lastName) => {
    if (!schema.validate(passwordField1)) {
      setState({
        response: null,
        loading: false,
        error: 'Password invalid',
      });
    } else if (passwordField1 !== passwordField2) {
      setState({
        response: null,
        loading: false,
        error: 'Passwords do not match',
      });
    } else if (email && passwordField1 && firstName && lastName) {
      setState({ response: null, loading: true, error: null });

      try {
        await mutateCustomer(
          fetchJson('/api/shopify/account/register', {
            method: 'POST',
            body: JSON.stringify({
              email,
              password: passwordField1,
              firstName,
              lastName,
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
        console.error('useRegisterCustomer failed: ', error.message);
        setState({
          response: null,
          loading: false,
          error: error?.data?.error || 'Register customer failed',
        });
      }
    } else {
      setState({
        response: null,
        loading: false,
        error: 'Missing customer input',
      });
    }
  };

  return [registerCustomer, state];
};

export default useRegisterCustomer;
