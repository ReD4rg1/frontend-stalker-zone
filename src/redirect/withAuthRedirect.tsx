import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

interface Props {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType): Props => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<Props> {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}
