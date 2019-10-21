import { userConstants } from '../constants';

export function bikers(state = {
  fetchingBikers: false,
  fetchedBikers: false,
  bikersData: null,
  error: null
}, action) {
  switch (action.type) {
    case userConstants.BIKERS_REQUEST:
      return {
        ...state,
        fetchingBikers: true
      }
    case userConstants.BIKERS_SUCCESS:
      return {
        ...state,
        fetchingBikers: false,
        fetchedBikers: true,
        bikersData: action.payload
      }
    case userConstants.BIKERS_FAILURE:
      return {
        ...state,
        fetchedBikers: false,
        bikersData: null,
        error: action.payload
      }
    default:
      return state;
  }
}