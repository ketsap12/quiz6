import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  usersListReducer,
} from './reducers/userReducers';
import {
  servicesListReducer,
  serviceDetailReducer,
  sellerServicesReducer,
} from './reducers/serviceReducers';
import {
  sellerApplicationReducer,
  sellerApplicationsListReducer,
} from './reducers/applicationReducers';
import { ordersReducer } from './reducers/orderReducers';
import { chatReducer } from './reducers/chatReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  usersList: usersListReducer,
  servicesList: servicesListReducer,
  serviceDetail: serviceDetailReducer,
  sellerServices: sellerServicesReducer,
  sellerApplication: sellerApplicationReducer,
  sellerApplicationsList: sellerApplicationsListReducer,
  orders: ordersReducer,
  chat: chatReducer,
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
