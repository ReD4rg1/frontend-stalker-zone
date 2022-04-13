import React from "react";
import { connect } from "react-redux";
import {AuthInitialState, logout} from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Header from "./Header"

interface Props {
    auth: AuthInitialState
    logout: () => void
}

class HeaderContainer extends React.Component<Props, any> {
    render() {
        return (
            <Header username={this.props.auth.username} logout={this.props.logout}/>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps,
    {logout})(HeaderContainer);