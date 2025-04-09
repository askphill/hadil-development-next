// hook to use useEffect only when dependencies change, and not at first load.

import { useEffect, useRef } from 'react';

// eslint-disable-next-line
export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
