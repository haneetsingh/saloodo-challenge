import { ordersConstants } from '../constants';

export function orderDetail(state = {
  fetchingOrderDetail: false,
  fetchedOrderDetail: false,
  order: null,
  error: null
}, action) {
  switch (action.type) {
    case ordersConstants.FETCH_ORDER_REQUEST:
      return {
        ...state,
        fetchingOrderDetail: true,
        fetchedOrderDetail: false,
        order: null,
        error: null
      }
    case ordersConstants.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        fetchingOrderDetail: false,
        fetchedOrderDetail: true,
        order: action.payload
      }
    case ordersConstants.FETCH_ORDER_FAIlURE:
      return {
        ...state,
        fetchedOrderDetail: false,
        order: null,
        error: action.payload
      }
    default:
      return state;
  }
}