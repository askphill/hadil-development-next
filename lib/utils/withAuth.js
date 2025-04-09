// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
// this allows us to use the context object from getServerSideProps besides next-iron-session's req and res
import getUpdatedCustomer from 'lib/shopify/getUpdatedCustomer';
import withSession from './session';

// eslint-disable-next-line no-underscore-dangle
function _withAuth(handler) {
  return async context => {
    const { req } = context;

    // get customer from session cookie
    const customer = req.session.get('customer');

    // if customer not found, redirect to login
    if (!customer?.isLoggedIn || !customer?.customerAccessToken?.accessToken) {
      return {
        redirect: {
          destination: '/account/login/',
          permanent: false,
        },
      };
    }

    const currentDate = new Date().getTime();
    const expireDate = new Date(customer.customerAccessToken.expiresAt).getTime();
    // if access token expires, redirect to login
    if (expireDate <= currentDate) {
      req.session.destroy();
      return {
        redirect: {
          destination: '/account/login/',
          permanent: false,
        },
      };
    }

    const updatedCustomer = await getUpdatedCustomer(customer.customerAccessToken.accessToken);
    // if cannot get updated customer, destroy session cookie and redirect to login
    if (!updatedCustomer?.isLoggedIn) {
      req.session.destroy();
      return {
        redirect: {
          destination: '/account/login/',
          permanent: false,
        },
      };
    }

    req.session.set('customer', {
      isLoggedIn: true,
      customerAccessToken: customer.customerAccessToken,
      firstName: updatedCustomer.firstName,
      lastName: updatedCustomer.lastName,
      email: updatedCustomer.email,
    });
    await req.session.save();

    const newCtx = {
      ...context,
      customer: { ...updatedCustomer, customerAccessToken: customer.customerAccessToken },
    };

    return handler(newCtx);
  };
}

export default function withAuth(handler) {
  return withSession(_withAuth(handler));
}
