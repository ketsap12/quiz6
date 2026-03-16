import * as types from '../constants/actionTypes';

export const chatReducer = (state = { loading: false, response: '', error: null }, action) => {
  switch (action.type) {
    case types.CHAT_REQUEST:
      return { loading: true, response: '' };
    case types.CHAT_SUCCESS:
      return { loading: false, response: action.payload };
    case types.CHAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
