import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {statusReducer} from './reducer';

const rootReducer = combineReducers({
  system: statusReducer,
});

//Store
export const store = createStore(rootReducer,applyMiddleware(thunk));
