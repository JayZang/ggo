import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadingBarReducer } from 'react-redux-loading-bar'
import reduxThunk from 'redux-thunk'

import viewReducer from './view/reducer'
import authReducer from './auth/reducer'
import iamReducer from './iam/reducer'
import memberReducer from './member/reducers'
import teamReducer from './team/reducers'
import customerReducer from './customer/reducers'
import projectReducer from './project/reducer'
import taskReducer from './task/reducer'

const rootReducer = combineReducers({
  view: viewReducer,
  auth: authReducer,
  iam: iamReducer,
  member: memberReducer,
  team: teamReducer,
  customer: customerReducer,
  project: projectReducer,
  task: taskReducer,
  loadingBar: loadingBarReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
  )
);

export type RootState = ReturnType<typeof rootReducer>;