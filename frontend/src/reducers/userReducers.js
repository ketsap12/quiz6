import * as types from '../constants/actionTypes';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loading: false,
  success: false,
  error: null,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, success: true };
    case types.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.USER_LOGOUT:
      return { userInfo: null, loading: false, success: false, error: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { loading: false, success: false, error: null }, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return { loading: true };
    case types.USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case types.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = { loading: false, userInfo: null, error: null }, action) => {
  switch (action.type) {
    case types.USER_PROFILE_REQUEST:
      return { loading: true };
    case types.USER_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersListReducer = (state = { loading: false, users: [], error: null }, action) => {
  switch (action.type) {
    case types.USERS_LIST_REQUEST:
      return { loading: true };
    case types.USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case types.USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
