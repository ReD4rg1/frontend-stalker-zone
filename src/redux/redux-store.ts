import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mapReducer from "./map-reducer";
import thunkMiddleware from "redux-thunk";
import playersReducer from "./players-reducer";
import authReducer from "./auth-reducer";

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let rootReducer = combineReducers({
    map: mapReducer,
    players: playersReducer,
    auth: authReducer,
})

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store