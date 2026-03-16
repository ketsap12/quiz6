import axios from 'axios';
import * as types from '../constants/actionTypes';

const API_URL = 'http://localhost:8000/api/v1';

// Send Chat Message
export const sendChatMessage = (question) => (dispatch) => {
  dispatch({ type: types.CHAT_REQUEST });
  
  axios
    .post(`${API_URL}/chat/ask/`, { question })
    .then((res) => {
      dispatch({
        type: types.CHAT_SUCCESS,
        payload: res.data.response,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.CHAT_FAIL,
        payload: error.response?.data?.error || 'Chat failed',
      });
    });
};
