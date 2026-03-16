import axios from 'axios';
import * as types from '../constants/actionTypes';

const API_URL = 'http://localhost:8000/api/v1';

// User Login
export const userLogin = (email, password) => (dispatch) => {
  dispatch({ type: types.USER_LOGIN_REQUEST });
  
  axios
    .post(`${API_URL}/users/login/`, { email, password })
    .then((res) => {
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.access);
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.USER_LOGIN_FAIL,
        payload: error.response?.data?.detail || 'Login failed',
      });
    });
};

// User Register
export const userRegister = formData => (dispatch) => {
  dispatch({ type: types.USER_REGISTER_REQUEST });
  
  axios
    .post(`${API_URL}/users/register/`, formData)
    .then((res) => {
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.access);
      dispatch({
        type: types.USER_REGISTER_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.USER_REGISTER_FAIL,
        payload: error.response?.data || { error: 'Registration failed' },
      });
    });
};

// Get User Profile
export const getUserProfile = () => (dispatch) => {
  dispatch({ type: types.USER_PROFILE_REQUEST });
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  axios
    .get(`${API_URL}/users/profile/`, config)
    .then((res) => {
      dispatch({
        type: types.USER_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.USER_PROFILE_FAIL,
        payload: error.response?.data?.detail || 'Failed to fetch profile',
      });
    });
};

// User Logout
export const userLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  dispatch({ type: types.USER_LOGOUT });
};

// Get Users List (Admin)
export const getUsersList = () => (dispatch) => {
  dispatch({ type: types.USERS_LIST_REQUEST });
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  axios
    .get(`${API_URL}/users/admin/users/`, config)
    .then((res) => {
      dispatch({
        type: types.USERS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.USERS_LIST_FAIL,
        payload: error.response?.data?.error || 'Failed to fetch users',
      });
    });
};
