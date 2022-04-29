import React from 'react';
import Map from "./Location/Map";
import {connect} from "react-redux";
import {
    AvailableHexes,
    fetchMap,
    generateMap,
    MapInitialState,
    setAvailableHexes
} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {RoomInitialState} from "../../redux/reducers/room-reducer";
import {Player, PlayersInitialState, setPlayers} from "../../redux/reducers/players-reducer";
import {withAuthMapRedirect} from "../../redirect/withAuthMapRedirect";
import Preloader from "../../components/common/Preloader/Preloader";
import {connectWS, disconnectWS, getCoords, getPlayers} from "../../api/Game/ws/playersWS";
import InterfaceContainer from "./Interface";

interface GenerateMapProps {
    players: Player[]
}

interface MapProps {
    map: MapInitialState
    rooms: RoomInitialState
    players: PlayersInitialState
    fetchMap: () => void
    generateMap: (players: GenerateMapProps) => void
    setPlayers: (players: Player[]) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
}

class MapMultiplayerContainer extends React.Component<MapProps, any>{

    constructor(props: MapProps) {
        super(props)
        this.state = {connect: false}
    }

    componentDidMount() {
        if (this.props.rooms.gameReadyStatus) this.props.fetchMap()
        connectWS(
            {
                setConnected: (connect) => this.setState({connect: connect}),
                setPlayers: this.props.setPlayers,
                setAvailableHexes: this.props.setAvailableHexes
            }
        )
    }

    componentDidUpdate(prevProps: Readonly<MapProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.connect !== this.state.connect) {
            if (this.state.connect) {
                getPlayers()
                getCoords()
            }
        }
    }

    componentWillUnmount() {
        disconnectWS()
    }

    render() {
        if (!this.props.map.mapIsGenerated) return <Preloader fetching={!this.props.map.mapIsGenerated} />
        return (
            <div>
                <Map map={this.props.map} players={this.props.players.players}/>
                <InterfaceContainer players={this.props.players.players} />
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
    connect(mapStateToProps, {generateMap, fetchMap, setPlayers, setAvailableHexes}),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
