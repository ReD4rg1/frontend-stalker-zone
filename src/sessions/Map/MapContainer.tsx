import React from 'react';
import Map from "./Location/Map";
import {connect} from "react-redux";
import {generateMap, MapInitialState} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {Player, PlayersInitialState} from "../../redux/reducers/players-reducer";

interface GenerateMapProps {
    players: Player[]
}

interface MapProps {
    map: MapInitialState
    players: PlayersInitialState
    generateMap: (players: GenerateMapProps) => void
}

class MapContainer extends React.Component<MapProps, any>{

    componentDidMount() {
        if (!this.props.map.mapIsGenerated) this.props.generateMap({players: this.props.players.players})
    }

    render() {
        return (
            <div>
                <Map map={this.props.map} players={this.props.players.players}/>
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        map: store.map,
        players: store.players
    }
}

export default compose(
    connect(mapStateToProps, {generateMap}),
)(MapContainer) as React.ComponentType
