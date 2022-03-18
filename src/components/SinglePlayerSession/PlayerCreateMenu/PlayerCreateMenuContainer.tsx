import React from "react";
import PlayerCreateMenu from "./PlayerCreateMenu";
import {connect} from "react-redux";
import {createPlayers, showPlayersInfo} from "../../../redux/players-reducer";
import {AppStateType} from "../../../redux/redux-store";


class PlayerCreateMenuContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.showPlayersInfo()
    }

    render() {
        return (
            <PlayerCreateMenu players={this.props.players}
                              //initialPlayersInfo={this.props.initialPlayersInfo}
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