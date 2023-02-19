import { createStore, combineReducers } from 'redux';

import namesReducer from './reducers/namesReducer';
import categoriesReducer from './reducers/categoriesReducer';

const rootReducer = combineReducers({
  namesState: namesReducer,
  categoriesState: categoriesReducer,
});

const store = createStore(rootReducer);

export default store;
