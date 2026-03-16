import axios from 'axios';
import * as types from '../constants/actionTypes';

const API_URL = 'http://localhost:8000/api/v1';

// Get Services List
export const getServicesList = () => (dispatch) => {
  dispatch({ type: types.SERVICES_LIST_REQUEST });
  
  axios
    .get(`${API_URL}/services/list/`)
    .then((res) => {
      dispatch({
        type: types.SERVICES_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.SERVICES_LIST_FAIL,
        payload: error.response?.data?.detail || 'Failed to fetch services',
      });
    });
};

// Get Service Detail
export const getServiceDetail = (id) => (dispatch) => {
  dispatch({ type: types.SERVICE_DETAIL_REQUEST });
  
  axios
    .get(`${API_URL}/services/${id}/`)
    .then((res) => {
      dispatch({
        type: types.SERVICE_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.SERVICE_DETAIL_FAIL,
        payload: error.response?.data?.detail || 'Failed to fetch service',
      });
    });
};

// Get Seller Services
export const getSellerServices = () => (dispatch) => {
  dispatch({ type: types.SELLER_SERVICES_REQUEST });
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  axios
    .get(`${API_URL}/services/manage/`, config)
    .then((res) => {
      dispatch({
        type: types.SELLER_SERVICES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.SELLER_SERVICES_FAIL,
        payload: error.response?.data?.error || 'Failed to fetch services',
      });
    });
};

// Create Service
export const createService = (formData) => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  return axios.post(`${API_URL}/services/manage/`, formData, config);
};

// Update Service
export const updateService = (id, formData) => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  return axios.patch(`${API_URL}/services/manage/${id}/`, formData, config);
};

// Delete Service
export const deleteService = (id) => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  return axios.delete(`${API_URL}/services/manage/${id}/`, config);
};
