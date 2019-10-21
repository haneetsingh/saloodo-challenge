import { ordersConstants } from '../constants';

export function orderUpdate(state= {
  fetchingOrderUpdate: false,
  fetchedOrderUpdate: false,
  updatedOrder: null,
  error: null
}, action) {
  switch (action.type) {
    case ordersConstants.FETCH_ORDER_UPDATE_REQUEST:
      return {
        ...state,
        fetchingOrderUpdate: true,
        fetchedOrderUpdate: false,
        updatedOrder: null,
        error: null
      }
    case ordersConstants.FETCH_ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        fetchingOrderUpdate: false,
        fetchedOrderUpdate: true,
        updatedOrder: action.payload
      }
    case ordersConstants.FETCH_ORDER_UPDATE_FAILURE:
      return {
        ...state,
        fetchingOrderUpdate: false,
        error: action.payload
      }
    default:
      return state
  }
}