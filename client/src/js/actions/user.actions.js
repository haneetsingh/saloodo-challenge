import axios from 'axios';
import { userConstants, ordersConstants } from '../constants';
import { history } from '../helpers/history';
// import { userService } from '../services';

export const userActions = {
  login,
  logout,
  getBikers,
  getUserOrders
};

function login(username, password) {
  return dispatch => {
    dispatch(request());

    const requestHeaders = {
      headers: { 'Content-Type': 'application/json' }
    }
  
    const requestBody = { username, password }
  
    return axios.post('http://localhost:5000/api/auth', requestBody, requestHeaders)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(success(response.data));
        history.push('/');
      })
      .catch((error) => {
        dispatch(failure(error.response.data));
      });
  };

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload: user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload: error } }
}

function logout() {
  return dispatch => {
    localStorage.removeItem('user');
    dispatch({ type: userConstants.LOGOUT });
  }
}

function getBikers() {
  return dispatch => {
    dispatch(request());

    axios.get('http://localhost:5000/api/users/biker')
      .then(response => {
        dispatch(success(response.data));
      })
      .catch((error) => {
        dispatch(failure(error.response.data));
      });
  }

  function request() { return { type: userConstants.BIKERS_REQUEST } }
  function success(bikers) { return { type: userConstants.BIKERS_SUCCESS, payload: bikers } }
  function failure(error) { return { type: userConstants.BIKERS_FAILURE, payload: error } }
}

function getUserOrders(id) {
  return dispatch => {
    dispatch(request());

    axios.get(`http://localhost:5000/api/users/${id}/orders`)
      .then(response => {
        console.log('response', response);
        dispatch(success(response.data));
      })
      .catch((error) => {
        dispatch(failure(error.response.data));
      })
  }

  function request() { return { type: ordersConstants.FETCH_USER_ORDERS_REQUEST } }
  function success(orders) { return { type: ordersConstants.FETCH_USER_ORDERS_SUCCESS, payload: orders } }
  function failure(error) { return { type: ordersConstants.FETCH_USER_ORDERS_FAIlURE, payload: error } }
}
