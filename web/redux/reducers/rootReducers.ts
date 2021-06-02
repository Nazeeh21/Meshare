import { combineReducers } from "redux";
import main from "./main";

const rootReducers = combineReducers({
  main: main,
});

export default rootReducers;
