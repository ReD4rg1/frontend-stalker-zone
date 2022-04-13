import React from "react";
import { connect } from "react-redux";
import {AuthInitialState, logout} from "../../redux/reducers/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Content from "./Content"

interface Props {
    auth: AuthInitialState
    logout: () => void
}

class Header extends React.Component<Props, any> {
    render() {
        return (
            <Content username={this.props.auth.username} logout={this.props.logout}/>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps,
    {logout})(Header);
