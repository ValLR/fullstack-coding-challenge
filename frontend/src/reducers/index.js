import { combineReducers } from 'redux';

import { alert } from './alert';
import { authentication } from './authentication';
import { registration } from './registration';

const rootReducer = combineReducers({
  alert,
  authentication,
  registration
});

export default rootReducer;
