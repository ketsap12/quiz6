import * as types from '../constants/actionTypes';

export const servicesListReducer = (state = { loading: false, services: [], error: null }, action) => {
  switch (action.type) {
    case types.SERVICES_LIST_REQUEST:
      return { loading: true, services: [] };
    case types.SERVICES_LIST_SUCCESS:
      return { loading: false, services: action.payload };
    case types.SERVICES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceDetailReducer = (state = { loading: false, service: {}, error: null }, action) => {
  switch (action.type) {
    case types.SERVICE_DETAIL_REQUEST:
      return { loading: true };
    case types.SERVICE_DETAIL_SUCCESS:
      return { loading: false, service: action.payload };
    case types.SERVICE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerServicesReducer = (state = { loading: false, services: [], error: null }, action) => {
  switch (action.type) {
    case types.SELLER_SERVICES_REQUEST:
      return { loading: true, services: [] };
    case types.SELLER_SERVICES_SUCCESS:
      return { loading: false, services: action.payload };
    case types.SELLER_SERVICES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
