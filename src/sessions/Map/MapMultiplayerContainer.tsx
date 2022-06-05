import React from 'react';
import Map from "./Location/Map";
import {connect} from "react-redux";
import {
    AvailableHexes,
    fetchMap,
    MapInitialState,
    setAvailableHexes
} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {RoomInitialState} from "../../redux/reducers/room-reducer";
import {
    applyEvent, CurrentEvent, eventRoll,
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
import TopPanel from "./Interface/Header/TopPanel";
import {AuthInitialState} from "../../redux/reducers/auth-reducer";
import Events from "./Events";
import Interface from "./Interface";
import TestButtons from "./TestButtons/TestButtons";
import Index from "./Store";
import {setMonster} from "../../redux/reducers/monster-reducer";

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
    setPlayers: (players: Player[], userId: number) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
    setEvents: (events: CurrentEvent) => void
    setMonster: (monster: any) => void
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
                setMonster: this.props.setMonster,
                auth: this.props.auth,
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
                 <TopPanel
                     players={this.props.players.players}
                     auth={this.props.auth}
                 />
                <TestButtons
                    event={this.props.players.currentEvent}
                    toggleShowCoords={this.toggleShowCoords}
                    showCoords={this.state.showCoords}
                    passMove={this.props.passMove}
                />
                <Events
                    players={this.props.players}
                    applyEvent={this.props.applyEvent}
                    passMove={this.props.passMove}
                    eventRoll={this.props.eventRoll}
                />
                <Interface
                    players={this.props.players}
                    makeRoll={this.props.makeRoll}
                    passMove={this.props.passMove}
                    event={this.props.players.currentEvent}
                    showEvent={this.props.showEvent}
                />
                <Index/>
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
        monster: store.monster,
    }
}

export default compose(
    connect(mapStateToProps, {
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
        setMonster,
    }),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
