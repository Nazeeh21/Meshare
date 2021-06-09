import { combineReducers } from 'redux';
import main from './main';
import questionResolver from './question';

const rootReducers = combineReducers({
  main: main,
  question: questionResolver,
});

export default rootReducers;
