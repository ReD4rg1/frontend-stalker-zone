import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mapReducer from "./map-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    map: mapReducer,
})

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store