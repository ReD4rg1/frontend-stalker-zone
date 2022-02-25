import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mapReducer from "./map-reducer";
import thunkMiddleware from "redux-thunk";
import playersReducer from "./players-reducer";

let reducers = combineReducers({
    map: mapReducer,
    players: playersReducer,
})

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store