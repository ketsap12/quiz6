import axios from 'axios';
import * as types from '../constants/actionTypes';

const API_URL = 'http://localhost:8000/api/v1';

// Submit Seller Application
export const submitApplication = () => (dispatch) => {
  dispatch({ type: types.SELLER_APPLICATION_REQUEST });
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  axios
    .post(`${API_URL}/applications/apply/`, {}, config)
    .then((res) => {
      dispatch({
        type: types.SELLER_APPLICATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.SELLER_APPLICATION_FAIL,
        payload: error.response?.data?.error || 'Failed to submit application',
      });
    });
};

// Get Seller Applications (Admin)
export const getSellerApplications = () => (dispatch) => {
  dispatch({ type: types.SELLER_APPLICATIONS_LIST_REQUEST });
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  axios
    .get(`${API_URL}/applications/list/`, config)
    .then((res) => {
      dispatch({
        type: types.SELLER_APPLICATIONS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.SELLER_APPLICATIONS_LIST_FAIL,
        payload: error.response?.data?.error || 'Failed to fetch applications',
      });
    });
};

// Approve Application
export const approveApplication = (id, merchantId) => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  return axios.patch(
    `${API_URL}/applications/${id}/approve/`,
    { merchant_id: merchantId },
    config
  );
};

// Decline Application
export const declineApplication = (id, reason) => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  return axios.patch(
    `${API_URL}/applications/${id}/decline/`,
    { decline_reason: reason },
    config
  );
};
