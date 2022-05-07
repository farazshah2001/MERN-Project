export const reducer = (state, action) => {
  switch (action.type) {
    case 'CUSTOMER_LOGIN':
      return ({ ...state, customer: action.payload, manager: null });
    case 'MANAGER_LOGIN':
      return ({ ...state, manager: action.payload, customer: null });

    default:
      throw new Error('no matching action type');
  }
};
