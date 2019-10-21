import axios from 'axios';
import { history } from '../helpers';
import { ordersConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));

export const ordersActions = {
  fetchOrdersList,
  fetchOrderDetail,
  updateOrderDetail
}

function fetchOrdersList() {
  return dispatch => {
    dispatch(request());

    axios.get('http://localhost:5000/api/orders')
    .then(response => {
      dispatch(success(response.data));
    })
    .catch((error) => {
      dispatch(failure(error.response.data));
    })
  };

  function request() { return { type: ordersConstants.FETCH_ORDERS_REQUEST } }
  function success(orders) { return { type: ordersConstants.FETCH_ORDERS_SUCCESS, payload: orders } }
  function failure(error) { return { type: ordersConstants.FETCH_ORDERS_FAIlURE, payload: error} }
}

function fetchOrderDetail(id) {
  return dispatch => {
    dispatch(request());

    axios.get(`http://localhost:5000/api/orders/${id}`)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch((error) => {
        dispatch(failure(error.response.data));
      });
  }

  function request() { return { type: ordersConstants.FETCH_ORDER_REQUEST } }
  function success(order) { return { type: ordersConstants.FETCH_ORDER_SUCCESS, payload: order } }
  function failure(error) { return { type: ordersConstants.FETCH_ORDER_FAIlURE, payload: error} }
}

function updateOrderDetail(orderId, assigneeId = null, status = null) {
  return dispatch => {
    let requestBody = {};
    if (assigneeId) {
      requestBody = { 'user_id': assigneeId };
    }
    if (status) {
      requestBody = { 'status': status };
    }

    const token = new Buffer(`${user.username}:${user.password}`).toString('base64');
    const requestHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      }
    };

    dispatch(request());

    axios.put(`http://localhost:5000/api/orders/${orderId}`, requestBody, requestHeaders)
    .then(response => {
      dispatch(success(response.data));
      history.push('/');
    })
    .catch((error) => {
      dispatch(failure(error.response.data));
    });
  }

  function request() { return { type: ordersConstants.FETCH_ORDER_UPDATE_REQUEST } }
  function success(order) { return { type: ordersConstants.FETCH_ORDER_UPDATE_SUCCESS, payload: order } }
  function failure(error) { return { type: ordersConstants.FETCH_ORDER_UPDATE_FAIlURE, payload: error} }
}
