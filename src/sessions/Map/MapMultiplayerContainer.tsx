import React from 'react';
import Map from "./Location/Map";
import {connect} from "react-redux";
import {fetchMap, generateMap, MapInitialState} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {RoomInitialState} from "../../redux/reducers/room-reducer";
import {Player, PlayersInitialState} from "../../redux/reducers/players-reducer";
import {withAuthMapRedirect} from "../../redirect/withAuthMapRedirect";
import Preloader from "../../components/common/Preloader/Preloader";

interface GenerateMapProps {
    players: Player[]
}

interface MapProps {
    map: MapInitialState
    rooms: RoomInitialState
    players: PlayersInitialState
    fetchMap: () => void
    generateMap: (players: GenerateMapProps) => void
}

class MapMultiplayerContainer extends React.Component<MapProps, any>{

    componentDidMount() {
        if (this.props.rooms.gameReadyStatus) this.props.fetchMap()
    }

    render() {
        if (!this.props.map.mapIsGenerated) return <Preloader fetching={!this.props.map.mapIsGenerated} />
        return (
            <div>
                <Map map={this.props.map} />
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        map: store.map,
        rooms: store.rooms,
        players: store.players
    }
}

export default compose(
    connect(mapStateToProps, {generateMap, fetchMap}),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
