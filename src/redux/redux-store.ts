import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mapReducer from "./reducers/map-reducer";
import thunkMiddleware from "redux-thunk";
import playersReducer from "./reducers/players-reducer";
import authReducer from "./reducers/auth-reducer";
import appReducer from "./reducers/app-reducer";
import roomReducer from "./reducers/room-reducer";
import monsterReducer from "./reducers/monster-reducer";

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let rootReducer = combineReducers({
    map: mapReducer,
    players: playersReducer,
    rooms: roomReducer,
    auth: authReducer,
    app: appReducer,
    monster: monsterReducer,
})

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
