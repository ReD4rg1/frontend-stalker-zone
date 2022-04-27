import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

interface Props {
    inSession: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): Props => ({
    inSession: state.rooms.inSession
})

export const withSessionRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<Props> {
        render() {
            if (this.props.inSession) return <Navigate to={'/multiplayer/room'} />
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}
