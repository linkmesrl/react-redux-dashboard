import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pluginsReducer from './pluginsReducer';
import dashboardsReducer from './dashboardsReducer';

const rootReducer = combineReducers({
  dashboardsReducer,
  pluginsReducer,
  routing: routerReducer
});

export default rootReducer;
