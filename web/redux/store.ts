import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducers from "./reducers/rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const makeStore = () =>
  createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export const wrapper = createWrapper(makeStore);
