import { combineReducers } from 'redux';

import { users } from './users.reducer';
import { bikers } from './bikers.reducer';
import { orders } from './orders.reducer';
import { orderDetail } from './orderDetail.reducer';
import { orderUpdate } from './orderUpdate.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
  users,
  bikers,
  orders,
  orderDetail,
  orderUpdate,
  authentication
});

export default rootReducer;
