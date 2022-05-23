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
    applyEvent, eventRoll,
    EventsType,
    makeRoll,
    moveTo,
    passMove,
    Player,
    PlayersInitialState, setEvents,
    setPlayers, showEvent
} from "../../redux/reducers/players-reducer";
import {withAuthMapRedirect} from "../../redirect/withAuthMapRedirect";
import Preloader from "../../components/common/Preloader/Preloader";
import {connectWS, disconnectWS, updateWS,} from "../../api/Game/ws/gameWS";
import InterfaceContainer from "./Interface";
import {AuthInitialState} from "../../redux/reducers/auth-reducer";
import Actions from "./Actions/Actions";
import Events from "./Events";

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
    setEvents: (events: any) => void
    makeRoll: (playerId: number) => void
    eventRoll: (playerId: number) => void
    passMove: (eventType: EventsType) => void
    showEvent: (playerId: number) => void
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void
}

interface State {
    connect: boolean
    showInfo: boolean
    showCoords: boolean
}

class MapMultiplayerContainer extends React.Component<MapProps, State>{

    constructor(props: MapProps) {
        super(props)
        this.state = {
            connect: false,
            showInfo: true,
            showCoords: false,
        }
        this.toggleShowInfo = this.toggleShowInfo.bind(this)
        this.toggleShowCoords = this.toggleShowCoords.bind(this)
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
                setAvailableHexes: this.props.setAvailableHexes,
                setEvents: this.props.setEvents,
            }
        )
    }

    toggleShowCoords() {
        this.setState({...this.state, showCoords: !this.state.showCoords})
    }

    componentDidUpdate(prevProps: Readonly<MapProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.map.mapIsGenerated !== this.props.map.mapIsGenerated) {
            if (this.state.connect && this.props.map.mapIsGenerated) {
                updateWS()
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
                    showCoords={this.state.showCoords}
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
                    showCoords={this.state.showCoords}
                    toggleShowCoords={this.toggleShowCoords}
                    event={this.props.players.currentEvent}
                    showEvent={this.props.showEvent}
                />
                <Events
                    players={this.props.players}
                    auth={this.props.auth}
                    applyEvent={this.props.applyEvent}
                    passMove={this.props.passMove}
                    eventRoll={this.props.eventRoll}
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
        setEvents,
        makeRoll,
        passMove,
        moveTo,
        showEvent,
        applyEvent,
        eventRoll,
    }),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
