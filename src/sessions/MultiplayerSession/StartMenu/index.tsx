import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {withAuthRedirect} from "../../../redirect/withAuthRedirect";
import MenuContainer from "./MenuContainer";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import {PlayersInitialState} from "../../../redux/reducers/players-reducer";
import {
    Character, ExitRoom,
    RoomInitialState,
    SetCharacters,
    SetRoomUsers,
    SetUsers, StartGame,
    User
} from "../../../redux/reducers/room-reducer";
import styles from "./index.module.css";

interface Props {
    auth: AuthInitialState
    players: PlayersInitialState
    rooms: RoomInitialState
    SetCharacters: (payload: Character[]) => void
    SetUsers: (payload: User[]) => void
    SetRoomUsers: (payload: string[]) => void
    ExitRoom: () => void
    StartGame: () => void
}

class SessionStartMenuContainer extends React.Component<Props, any> {
    render() {
        return (
            <main>
                <section>
                    <MenuContainer
                        auth={this.props.auth}
                        players={this.props.players}
                        rooms={this.props.rooms}
                        SetCharacters={this.props.SetCharacters}
                        SetUsers={this.props.SetUsers}
                        SetRoomUsers={this.props.SetRoomUsers}
                        ExitRoom={this.props.ExitRoom}
                        StartGame={this.props.StartGame}
                    />
                </section>
            </main>
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
    connect(mapStateToProps, {SetCharacters, SetUsers, SetRoomUsers, ExitRoom, StartGame}),
    withAuthRedirect,
)(SessionStartMenuContainer) as React.ComponentType
