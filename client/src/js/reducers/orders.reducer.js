import { ordersConstants } from '../constants';

export function orders(state = {
  fetchingOrders: false,
  fetchedOrders: false,
  data: null,
  error: null
}, action) {
  switch (action.type) {
    case ordersConstants.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        fetchingOrders: true,
        fetchedOrders: false,
        data: null,
        error: null
      }
    case ordersConstants.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingOrders: false,
        fetchedOrders: true,
        data: action.payload,
      }
    case ordersConstants.FETCH_ORDERS_FAIlURE:
      return {
        ...state,
        fetchingOrders: false,
        fetchedOrders: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}