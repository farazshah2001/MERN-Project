import React, { useContext, useReducer } from 'react';
import { reducer } from './reducer';

const AppContext = React.createContext();
const initialState = {
  customer: null,
  manager: null
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const customerLogin = (customer) => {
    dispatch({ type: 'CUSTOMER_LOGIN', payload: customer });
  };
  const managerLogin = (manager) => {
    dispatch({ type: 'MANAGER_LOGIN', payload: manager });
  };
  return (
        <AppContext.Provider value={{ ...state, customerLogin, managerLogin }}>{children}</AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
