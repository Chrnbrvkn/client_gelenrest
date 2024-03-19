import { combineReducers } from 'redux';
import tablesReducer from './tablesReducer';

const rootReducer = combineReducers({
  tables: tablesReducer,
});

export default rootReducer;
