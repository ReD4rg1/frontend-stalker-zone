import React from 'react';
import Map from "./Location/Map";
import {connect} from "react-redux";
import {generateMap, MapInitialState} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {moveTo, Player, PlayersInitialState} from "../../redux/reducers/players-reducer";
import {AuthInitialState} from "../../redux/reducers/auth-reducer";

interface GenerateMapProps {
    players: Player[]
}

interface MapProps {
    map: MapInitialState
    auth: AuthInitialState
    players: PlayersInitialState
    generateMap: (players: GenerateMapProps) => void
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
}

class MapContainer extends React.Component<MapProps, any>{

    componentDidMount() {
        if (!this.props.map.mapIsGenerated) this.props.generateMap({players: this.props.players.players})
    }

    render() {
        return (
            <div>
                <Map
                    map={this.props.map}
                    players={this.props.players.players}
                    moveTo={this.props.moveTo}
                    auth={this.props.auth}
                    showCoords={true}
                />
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        map: store.map,
        players: store.players,
        auth: store.auth
    }
}

export default compose(
    connect(mapStateToProps, {generateMap, moveTo}),
)(MapContainer) as React.ComponentType
