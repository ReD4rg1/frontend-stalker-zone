import React from 'react';
import Map from "./Location/Map";
import {connect} from "react-redux";
import {fetchMap, generateMap, MapInitialState} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {RoomInitialState} from "../../redux/reducers/room-reducer";
import {fetchPlayers, Player, PlayersInitialState, setPlayers} from "../../redux/reducers/players-reducer";
import {withAuthMapRedirect} from "../../redirect/withAuthMapRedirect";
import Preloader from "../../components/common/Preloader/Preloader";
import {connectWS, disconnectWS} from "../../api/Game/ws/playersWS";

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
    fetchPlayers: () => void
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
                setPlayers: this.props.setPlayers
            }
        )
    }

    componentDidUpdate(prevProps: Readonly<MapProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.connect !== this.state.connect) {
            if (this.state.connect) {
                this.props.fetchPlayers()
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
    connect(mapStateToProps, {generateMap, fetchMap, setPlayers, fetchPlayers}),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
