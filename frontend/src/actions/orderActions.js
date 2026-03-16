import axios from 'axios';
import * as types from '../constants/actionTypes';

const API_URL = 'http://localhost:8000/api/v1';

// Get Orders
export const getOrders = () => (dispatch) => {
  dispatch({ type: types.ORDERS_REQUEST });
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  axios
    .get(`${API_URL}/orders/history/`, config)
    .then((res) => {
      dispatch({
        type: types.ORDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.ORDERS_FAIL,
        payload: error.response?.data?.error || 'Failed to fetch orders',
      });
    });
};

// Create Order
export const createOrder = (serviceId, paypalTransactionId, pricePaid) => (dispatch) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const orderData = {
    service: serviceId,
    paypal_transaction_id: paypalTransactionId,
    price_paid: pricePaid,
  };
  
  return axios.post(`${API_URL}/orders/create/`, orderData, config);
};
