import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

interface Props {
    isAuth: boolean
    inSession: boolean
    playersIsReady: boolean
    gameIsReady: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): Props => ({
    inSession: state.rooms.inSession,
    playersIsReady: state.players.playersIsReady,
    gameIsReady: state.rooms.gameReadyStatus,
    isAuth: state.auth.isAuth,
})

export const withGameStartRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<Props> {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            if (!this.props.inSession) return <Navigate to={'/multiplayer'} />
            if (this.props.gameIsReady) return <Navigate to={'/multiplayer/map'} />
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}
