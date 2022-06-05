import React from "react";
import { connect } from "react-redux";
import {AuthInitialState, logout} from "../../redux/reducers/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Content from "./Content"
import {RoomInitialState} from "../../redux/reducers/room-reducer";

interface Props {
    auth: AuthInitialState
    rooms: RoomInitialState
    logout: () => void
}

class Header extends React.Component<Props, any> {
    render() {
        return (
            <Content
                auth={this.props.auth}
                logout={this.props.logout}
                gameIsReady={this.props.rooms.gameReadyStatus}
            />
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth,
        rooms: store.rooms
    }
}

export default connect(mapStateToProps,
    {logout})(Header);
