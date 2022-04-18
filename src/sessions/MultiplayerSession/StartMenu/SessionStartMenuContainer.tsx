import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {withAuthRedirect} from "../../../redirect/withAuthRedirect";
import MenuContainer from "./MenuContainer";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import {PlayersInitialState} from "../../../redux/reducers/players-reducer";
import {RoomInitialState} from "../../../redux/reducers/room-reducer";

interface Props {
    auth: AuthInitialState
    players: PlayersInitialState
    rooms: RoomInitialState
}

class SessionStartMenuContainer extends React.Component<Props, any> {
    render() {
        return (
            <div>
                <div>
                    Session set ^_^
                </div>
                <div>
                    <MenuContainer
                        auth={this.props.auth}
                        players={this.props.players}
                        rooms={this.props.rooms}
                    />
                </div>
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth,
        players: store.players,
        rooms: store.rooms
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect,
)(SessionStartMenuContainer) as React.ComponentType
