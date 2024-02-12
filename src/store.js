import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import loginReducer from "./reducers/loginReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import categoryReducer from "./reducers/categoryReducer";
const rootReducer = combineReducers({
  loginData: loginReducer,
  dashboardData: dashboardReducer,
  categoryData: categoryReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
