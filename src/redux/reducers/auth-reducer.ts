import authAPI from "../../api/loginAPI";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import { AppStateType } from "../redux-store";
import {setToken} from "../../api/token";
import {EmptyObject} from "redux";

const SET_USERS_DATA = 'SET-USERS-DATA'

export interface AuthInitialState {
    username: string | null
    userId: number | null
    isAuth: boolean
}

const initialState: AuthInitialState = {
    username: null,
    userId: null,
    isAuth: false,
}

type ActionsType = SetUsersDataType

const authReducer = (state = initialState, action: ActionsType): AuthInitialState => {

    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

type SetUsersDataTypePayloadType = {
    username: string | null,
    userId: number | null,
    isAuth: boolean,
}
type SetUsersDataType = {
    type: typeof SET_USERS_DATA,
    payload: SetUsersDataTypePayloadType
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const setUsersData = (payload: SetUsersDataTypePayloadType): SetUsersDataType => ({
    type: SET_USERS_DATA,
    payload: {
        username: payload.username,
        userId: payload.userId,
        isAuth: payload.isAuth,
    },
})

export const getAuth = (): ThunkType => {
    return (async (dispatch) => {
        let response = await authAPI.getAuth()
        if (response.resultCode === 0) {
            let {username, userId} = response
            dispatch(setUsersData({username, userId, isAuth: true}))
        }
        if (response.resultCode === 1) {
            dispatch(setUsersData({username: null, userId: null, isAuth: false}))
        }
    })
}

type ValuesType = {
    name: string
    password: string
}
type SetStatusObjectType = {
    messageEmail: string
    messagePassword: string
}
type LoginPropsType = {
    values: ValuesType,
    setStatus: (object: SetStatusObjectType) => void,
    resetForm: () => void,
    setSubmitting: (submitting: boolean) => void
}
type ResponseType = {
    resultCode: number
    username?: string
    userId?: number
    token?: string
    errorMessage?: string
}

const setResponseToken = (props: LoginPropsType, response: ResponseType, dispatch: ThunkDispatch<EmptyObject & AppStateType, unknown, ActionsType>) => {
    if (response.resultCode === 0) {
        setToken(response.token ?? '')
        if (response.username && response.userId) {
            dispatch(setUsersData({username: response.username, userId: response.userId, isAuth: true}))
        }
        props.setSubmitting(false)
        props.resetForm()
    } else {
        props.setSubmitting(false)
        props.setStatus({
            messageEmail: response.errorMessage ?? '',
            messagePassword: response.errorMessage ?? '',
        })
    }
}

export const registration = (props: LoginPropsType): ThunkType => {

    return (async (dispatch) => {
        let response = await authAPI.signUp(props.values.name, props.values.password)
        setResponseToken(props, response, dispatch)
    })
}

export const login = (props: LoginPropsType): ThunkType => {

    return (async (dispatch) => {
        let response = await authAPI.login(props.values.name, props.values.password)
        setResponseToken(props, response, dispatch)
    })
}

export const logout = (): ThunkType => {

    return (async (dispatch) => {
        let response = await authAPI.logout()
        if (response.resultCode === 0) {
            setToken('')
            dispatch(setUsersData({username: null, userId: null, isAuth: false}))
        }
    })
}

export default authReducer
