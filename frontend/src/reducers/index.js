import { combineReducers } from 'redux';

import { alert } from './alert';
import { registration } from './registration';


const rootReducer = combineReducers({
  alert,
  registration,
});

export default rootReducer;
