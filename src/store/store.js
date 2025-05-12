import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import { toyReducer } from './reducers/toy.reducer.js'
import { thunk } from 'redux-thunk' // ✅ correct import

const rootReducer = combineReducers({
  toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

window.gStore = store