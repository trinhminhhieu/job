import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { postjobReduce } from "../reducers/postjobReduce";
import { authReduce } from "../reducers/userReduce";

//TODO REDUCER HIEUGROUP,INC
const reducer = combineReducers({
  postjob: postjobReduce,
  auth: authReduce,
});

const initialState = {};

const middleware = [thunk];

// config the store //PENDING
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// export default the store
export default store;
