import { createStore, combineReducers } from 'redux';

import { configView } from './view/reducer';

const rootReducer = combineReducers({
  view: configView
})

export default createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

