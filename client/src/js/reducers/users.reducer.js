import { ordersConstants } from '../constants';

export function users(state = {
  fetchingUserOrders: false,
  fetchedUserOrders: false,
  userOrders: null,
  error: null
}, action) {
  switch (action.type) {
    case ordersConstants.FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        fetchingUserOrders: true,
        fetchedUserOrders: false,
        userOrders: null,
        error: null
      }
    case ordersConstants.FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingUserOrders: false,
        fetchedUserOrders: true,
        userOrders: action.payload
      }
    case ordersConstants.FETCH_USER_ORDERS_FAIlURE:
      return {
        ...state,
        fetchedUserOrders: false,
        userOrders: null,
        error: action.payload
      }
    default:
      return state;
  }
}