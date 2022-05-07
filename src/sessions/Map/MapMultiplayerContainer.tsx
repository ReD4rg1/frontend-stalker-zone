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
import {
    makeRoll,
    moveTo,
    passMove,
    Player,
    PlayersInitialState,
    setPlayers
} from "../../redux/reducers/players-reducer";
import {withAuthMapRedirect} from "../../redirect/withAuthMapRedirect";
import Preloader from "../../components/common/Preloader/Preloader";
import {connectWS, disconnectWS, getCoords, getPlayers} from "../../api/Game/ws/playersWS";
import InterfaceContainer from "./Interface";
import {AuthInitialState} from "../../redux/reducers/auth-reducer";
import Actions from "./actions/Actions";

interface GenerateMapProps {
    players: Player[]
}

interface MapProps {
    map: MapInitialState
    auth: AuthInitialState
    rooms: RoomInitialState
    players: PlayersInitialState
    fetchMap: () => void
    generateMap: (players: GenerateMapProps) => void
    setPlayers: (players: Player[]) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
    makeRoll: (playerId: number) => void
    passMove: () => void
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
}

interface State {
    connect: boolean
    showInfo: boolean
}

class MapMultiplayerContainer extends React.Component<MapProps, State>{

    constructor(props: MapProps) {
        super(props)
        this.state = {
            connect: false,
            showInfo: true,
        }
        this.toggleShowInfo = this.toggleShowInfo.bind(this)
    }

    toggleShowInfo() {
        this.setState({...this.state, showInfo: !this.state.showInfo})
    }

    componentDidMount() {
        if (this.props.rooms.gameReadyStatus) this.props.fetchMap()
        connectWS(
            {
                setConnected: (connect) => this.setState({...this.state, connect: connect}),
                setPlayers: this.props.setPlayers,
                setAvailableHexes: this.props.setAvailableHexes
            }
        )
    }

    componentDidUpdate(prevProps: Readonly<MapProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.map.mapIsGenerated !== this.props.map.mapIsGenerated) {
            if (this.state.connect && this.props.map.mapIsGenerated) {
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
                <Map
                    map={this.props.map}
                    auth={this.props.auth}
                    players={this.props.players.players}
                    moveTo={this.props.moveTo}
                />
                 <InterfaceContainer
                     players={this.props.players.players}
                     auth={this.props.auth}
                     toggleShowInfo={this.toggleShowInfo}
                     showInfo={this.state.showInfo}
                 />
                <Actions
                    players={this.props.players.players}
                    auth={this.props.auth}
                    makeRoll={this.props.makeRoll}
                    passMove={this.props.passMove}
                />
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        map: store.map,
        rooms: store.rooms,
        players: store.players,
        auth: store.auth,
    }
}

export default compose(
    connect(mapStateToProps, {
        generateMap,
        fetchMap,
        setPlayers,
        setAvailableHexes,
        makeRoll,
        passMove,
        moveTo,
    }),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
