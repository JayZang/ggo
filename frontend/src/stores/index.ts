import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import { configView } from './view/reducer';

const rootReducer = combineReducers({
  view: configView
})

export default createStore(
  rootReducer,
  composeWithDevTools()
);

export type RootState = ReturnType<typeof rootReducer>;