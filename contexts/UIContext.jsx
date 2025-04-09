import { useMemo, useReducer, createContext, useContext } from 'react';

const initialState = {
  displayCart: false,
};

export const UIContext = createContext(initialState);

function uiReducer(state, action) {
  switch (action.type) {
    case 'OPEN_CART': {
      return {
        ...state,
        displayCart: true,
      };
    }
    case 'CLOSE_CART': {
      return {
        ...state,
        displayCart: false,
      };
    }
    default: {
      return console.log('no action');
    }
  }
}

export const UIProvider = props => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = () =>
    state.displayCart ? dispatch({ type: 'CLOSE_CART' }) : dispatch({ type: 'OPEN_CART' });

  const value = useMemo(
    () => ({
      ...state,
      openCart,
      closeCart,
      toggleCart,
    }),
    [state]
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const UIContextProvider = ({ children }) => <UIProvider>{children}</UIProvider>;
