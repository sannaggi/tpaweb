import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {};

const middleWare = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleWare),
    )
)

export default store;