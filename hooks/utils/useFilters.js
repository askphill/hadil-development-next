import { useState, useReducer, useEffect } from 'react';

//  CHANGE THE FILTER CATEGORIES WITH RELEVANT ONES FOR THE PROJECT YOU ARE WORKING ON
const initialState = {
  filters: {
    color: [],
    size: [],
    type: [],
  },
  priceFilter: {
    min: 0,
    max: 10000,
    active: false,
  },
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE': {
      const payload = !Object.keys(action.payload).length ? initialState : action.payload;
      return {
        ...state,
        ...payload,
      };
    }
    case 'ADD_FILTER': {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.id]: [...state.filters[action.payload.id], action.payload.value],
        },
        isActive: true,
      };
    }
    case 'ADD_PRICE_FILTER': {
      return {
        ...state,
        priceFilter: {
          min: action.payload.min,
          max: action.payload.max,
          active: true,
        },
        isActive: true,
      };
    }
    case 'REMOVE_PRICE_FILTER': {
      const newState = {
        ...state,
        priceFilter: {
          min: 0,
          max: 10000,
          active: false,
        },
      };

      const values = [...Object.values(newState.filters)];
      const isActive = values.some(arr => arr.length > 0) && state.priceFilter.active;

      return {
        ...newState,
        isActive,
      };
    }
    case 'REMOVE_FILTER': {
      const newState = {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.id]: state.filters[action.payload.id].filter(
            v => v !== action.payload.value
          ),
        },
      };

      const values = [...Object.values(newState.filters)];
      const isActive = values.some(arr => arr.length > 0);

      return {
        ...newState,
        isActive,
      };
    }

    case 'CLEAR_FILTERS': {
      return initialState;
    }

    default:
      return null;
  }
}

// CHANGE THE SHAPE OF THE PRODUCT OBJECT BASED ON THE PROJECT!

// Utility function to reduce the lines of code in the useFilter below:
// This is used in every single filter type and returns an array of products filtered by the key argument
const filterProds = (array, key, state) => {
  const filteredProds = array.filter(product => {
    const prodFilters = product.filtersCollection.items.find(property => property.id === key);
    return prodFilters?.value.some(property =>
      state.filters[key].includes(property.toLowerCase()) ? product : null
    );
  });

  return filteredProds;
};

// Filter by price range
const filterByPrice = (array, min, max) => {
  const filteredByPrice = array.filter(product => {
    const { price } = product.shopifyData.stores.dev;
    return price >= min && price <= max;
  });

  return filteredByPrice;
};

export const useFilter = products => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterPrice = array => {
    const filteredByPrice = filterByPrice(array, state.priceFilter.min, state.priceFilter.max);
    return setFilteredProducts(filteredByPrice);
  };

  const filterAllProps = array => {
    let filtProducts = array;
    Object.entries(state.filters).forEach(([key, value]) => {
      if (value.length >= 1) {
        if (key === 'color') {
          filtProducts = filtProducts.filter(({ color }) =>
            value.includes(color.title.toLowerCase())
          );
        } else {
          filtProducts = filterProds(filtProducts, key, state);
        }
      }
    });
    return filterPrice(filtProducts);
  };

  useEffect(() => {
    filterAllProps(products);
  }, [state]);


  // METHODS
 const loadState = payload => { // Loads filters and applies them using local storage, see example below
    dispatch({ type: 'LOAD_STATE', payload });
    setFilteredProducts(products);
  };

  const addFilter = filter => {
    dispatch({ type: 'ADD_FILTER', payload: filter });
  };

  const addPriceFilter = range => {
    dispatch({ type: 'ADD_PRICE_FILTER', payload: range });
  };

  const removePriceFilter = () => {
    dispatch({ type: 'REMOVE_PRICE_FILTER' });
  };

  const removeFilter = filter => {
    dispatch({ type: 'REMOVE_FILTER', payload: filter });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };


  const handleChange = (id, value, checked) => {
    if (!checked) {
      addFilter({
        id,
        value,
      });
    } else {
      removeFilter({
        id,
        value,
      });
    }
  };

  return {
    state,
    filteredProducts,
    filterAllProps,
    loadState,
    addFilter,
    addPriceFilter,
    removeFilter,
    removePriceFilter,
    clearFilters,
    handleChange,
    sortProducts,
  };
};

export default useFilter;


// PERSIST FILTERS IN YOUR COLLECTION PAGE USING LOCAL STORAGE 
// This solution allows to have filters saved in Local storage and active during the session for each different collection, meaning every collection will have different data/filters saved during the customer journey.

// e.g Collection.jsx

// import useFilter from 'hooks/utils/useFilter';
// import { useDidMountEffect } from 'hooks/utils/useDidMountEffect';
// import { useRouter } from 'next/router';


// const Collection = ({products}) =>

//    const router = useRouter();
//    const {
//     state,
//     filteredProducts,
//     filterAllProps,
//     loadState,
//     handleChange,
//     addPriceFilter,
//     removeFilter,
//     removePriceFilter,
//     clearFilters,
//     sortProducts,
//    } = useFilter(products);

  //  useEffect(() => {
  //   const collection = router.query.slug;
  //   const savedState = JSON.parse(get(`${collection}-filters`));
  //   if (!savedState) loadState({});

  //   if (savedState) {
  //     loadState(savedState);
  //     filterAllProps(products);
  //   }
  //  }, [router]);

  //  useDidMountEffect(() => {
  //   const collection = router.query.slug;
  //   set(`${collection}-filters`, JSON.stringify(state));
  //  }, [state]);

  // return <></>

//}