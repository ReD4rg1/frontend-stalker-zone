import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

interface Props {
    isAuth: boolean
    gameIsReady: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): Props => ({
    gameIsReady: state.rooms.gameReadyStatus,
    isAuth: state.auth.isAuth,
})

export const withAuthMapRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<Props> {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            if (!this.props.gameIsReady) return <Navigate to={'/multiplayer'} />
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}
