import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export const useCustomer = ({ redirectTo = false, redirectIfFound = false } = {}) => {
  // this hook behaves like useEffect; customer object may not be available at first, so do a check in component:
  // if (customer?.isLoggedIn) { ... do something }
  const { data: customer, mutate: mutateCustomer } = useSWR('/api/shopify/account/customer');

  useEffect(() => {
    // if no redirect needed, just return
    // if customer data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !customer) return;

    if (
      // If redirectTo is set, redirect if the customer was not found.
      (redirectTo && !redirectIfFound && !customer?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the customer was found
      (redirectIfFound && customer?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [customer, redirectIfFound, redirectTo]);

  return { customer, mutateCustomer };
};

export default useCustomer;
