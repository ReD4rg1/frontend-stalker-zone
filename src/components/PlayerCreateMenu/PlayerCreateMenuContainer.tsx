import React from "react";
import PlayerCreateMenu from "./PlayerCreateMenu";
import {connect} from "react-redux";
import {createPlayers, showPlayersInfo} from "../../redux/players-reducer";


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

let mapStateToProps = (store: any) => {
    return {
        players: store.players
    }
}

export default connect(mapStateToProps,
    {
        createPlayers,
        showPlayersInfo
    })(PlayerCreateMenuContainer)