import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

interface Props {
    playersIsReady: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): Props => ({
    playersIsReady: state.players.playersIsReady
})

export const withPlayersReadyRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<Props> {
        render() {
            if (!this.props.playersIsReady) return <Navigate to={'/login'} />
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}
