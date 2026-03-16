import * as types from '../constants/actionTypes';

export const ordersReducer = (state = { loading: false, orders: [], error: null }, action) => {
  switch (action.type) {
    case types.ORDERS_REQUEST:
      return { loading: true, orders: [] };
    case types.ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case types.ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
