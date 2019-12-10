import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadingBarReducer } from 'react-redux-loading-bar'
import reduxThunk from 'redux-thunk'

import viewReducer from './view/reducer'
import memberReducer from './member/reducers'
import teamReducer from './team/reducers'
import customerReducer from './customer/reducers'

const rootReducer = combineReducers({
  view: viewReducer,
  member: memberReducer,
  team: teamReducer,
  customer: customerReducer,
  loadingBar: loadingBarReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
  )
);

export type RootState = ReturnType<typeof rootReducer>;