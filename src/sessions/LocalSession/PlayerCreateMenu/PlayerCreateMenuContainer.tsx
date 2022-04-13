import React from "react";
import PlayerCreateMenu from "./PlayerCreateMenu";
import {connect} from "react-redux";
import {createPlayers, showPlayersInfo} from "../../../redux/reducers/players-reducer";
import {AppStateType} from "../../../redux/redux-store";
import { Navigate } from "react-router-dom";


class PlayerCreateMenuContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.showPlayersInfo()
    }

    render() {
        if (this.props.players.playersIsReady) {
            return <Navigate to={"/session"}/>
        }
        return (
            <PlayerCreateMenu players={this.props.players}
                              createPlayers={this.props.createPlayers}
            />
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        players: store.players
    }
}

export default connect(mapStateToProps,
    {
        createPlayers,
        showPlayersInfo
    })(PlayerCreateMenuContainer)
