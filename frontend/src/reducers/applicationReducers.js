import * as types from '../constants/actionTypes';

export const sellerApplicationReducer = (state = { loading: false, application: null, success: false, error: null }, action) => {
  switch (action.type) {
    case types.SELLER_APPLICATION_REQUEST:
      return { loading: true, success: false };
    case types.SELLER_APPLICATION_SUCCESS:
      return { loading: false, application: action.payload, success: true };
    case types.SELLER_APPLICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerApplicationsListReducer = (state = { loading: false, applications: [], error: null }, action) => {
  switch (action.type) {
    case types.SELLER_APPLICATIONS_LIST_REQUEST:
      return { loading: true, applications: [] };
    case types.SELLER_APPLICATIONS_LIST_SUCCESS:
      return { loading: false, applications: action.payload };
    case types.SELLER_APPLICATIONS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
