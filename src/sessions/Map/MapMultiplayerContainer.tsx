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
    EventsType, getShop,
    makeRoll,
    moveTo,
    passMove, passOrder,
    Player,
    PlayersInitialState, removeItem, sellItem, setEvents, setItem, setItemFromBackpack, setOrder,
    setPlayers, showEvent, useGrenade, useMedkit, useStimulator
} from "../../redux/reducers/players-reducer";
import {withAuthMapRedirect} from "../../redirect/withAuthMapRedirect";
import Preloader from "../../components/common/Preloader/Preloader";
import {connectWS, disconnectWS, updateWS,} from "../../api/Game/ws/gameWS";
import {AuthInitialState} from "../../redux/reducers/auth-reducer";
import Events from "./Events";
import Interface from "./Interface";
import TestButtons from "./TestButtons/TestButtons";
import {
    MonsterInitialState,
    startFight,
    setMonster,
    setFightEffect,
    playerAttack, monsterAttack, nextMember, endFight, playerDied, setFightQueue, FightType
} from "../../redux/reducers/monster-reducer";
import {ItemTypes} from "../../api/Game/inventoryAPI";
import Store from "./Store/Store";
import Fight from "./Fight/Fight";
import Inventory from "./Inventory/Inventory";
import MapLocation from "./MapLocation/MapLocation";

interface GenerateMapProps {
    players: Player[]
}

interface MapProps {
    map: MapInitialState
    auth: AuthInitialState
    rooms: RoomInitialState
    players: PlayersInitialState
    monster: MonsterInitialState

    fetchMap: () => void
    generateMap: (players: GenerateMapProps) => void

    setPlayers: (players: Player[], userId: number) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
    setEvents: (events: CurrentEvent) => void

    setMonster: (monster: any) => void
    setFightEffect: (effect: any) => void
    setFightQueue: (queue: any) => void
    startFight: (level: number, playerId: number, eventId: number) => void
    playerAttack: FightType
    monsterAttack: FightType
    nextMember: FightType
    playerDied: FightType
    endFight: FightType

    makeRoll: (playerId: number) => void
    eventRoll: (playerId: number) => void
    passMove: (eventType: EventsType) => void
    showEvent: (playerId: number) => void
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void

    getShop: () => void
    setItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
    useMedkit: (playerId: number, medkitId: number) => void
    useStimulator: (playerId: number, stimulatorId: number) => void
    useGrenade: (playerId: number, grenadeId: number) => void
    removeItem: (playerId: number, itemId: number, price: number,type: ItemTypes) => void
    sellItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
    setItemFromBackpack: (playerId: number, itemId: number, type: ItemTypes) => void

    setOrder: (playerId: number) => void
    passOrder: (playerId: number, place: "base" | "village" | "laboratory") => void
}

interface State {
    isWeapon: boolean
    connect: boolean
    showInfo: boolean
    showCoords: boolean
    showShop: boolean
    showEvent: boolean
    showInventory: boolean
    showFight: boolean
    showLocation: boolean
    showOrder: boolean
    medkitsPosition: number
    stimsPosition: number
    grenadesPosition: number
}

class MapMultiplayerContainer extends React.Component<MapProps, State>{

    constructor(props: MapProps) {
        super(props)
        this.state = {
            isWeapon: true,
            connect: false,
            showInfo: true,
            showCoords: false,
            showShop: false,
            showEvent: false,
            showFight: false,
            showLocation: false,
            showOrder: false,
            medkitsPosition: 0,
            stimsPosition: 0,
            grenadesPosition: 0,
            showInventory: false,
        }
        this.toggleShowInfo = this.toggleShowInfo.bind(this)
        this.toggleWeapon = this.toggleWeapon.bind(this)
        this.toggleShowCoords = this.toggleShowCoords.bind(this)
        this.toggleShowShop = this.toggleShowShop.bind(this)
        this.toggleShowEvent = this.toggleShowEvent.bind(this)
        this.toggleShowInventory = this.toggleShowInventory.bind(this)
        this.toggleShowFight = this.toggleShowFight.bind(this)
        this.toggleShowLocation = this.toggleShowLocation.bind(this)
        this.toggleShowOrder = this.toggleShowOrder.bind(this)
        this.setMedkitsPosition = this.setMedkitsPosition.bind(this)
        this.setStimsPosition = this.setStimsPosition.bind(this)
        this.setGrenadesPosition = this.setGrenadesPosition.bind(this)
    }

    setMedkitsPosition(position: number) {
        if ((this.state.medkitsPosition + position) < 0) this.setState({...this.state, medkitsPosition: this.props.players.myPlayer.inventory.medkits.length-1})
        else if ((this.state.medkitsPosition + position) >= this.props.players.myPlayer.inventory.medkits.length) this.setState({...this.state, medkitsPosition: 0})
        else this.setState({...this.state, medkitsPosition: this.state.medkitsPosition + position})
    }

    setStimsPosition(position: number) {
        if ((this.state.stimsPosition + position) < 0) this.setState({...this.state, stimsPosition: this.props.players.myPlayer.inventory.stimulants.length-1})
        else if ((this.state.stimsPosition + position) >= this.props.players.myPlayer.inventory.stimulants.length) this.setState({...this.state, stimsPosition: 0})
        else this.setState({...this.state, stimsPosition: this.state.stimsPosition + position})
    }

    setGrenadesPosition(position: number) {
        if ((this.state.grenadesPosition + position) < 0) this.setState({...this.state, grenadesPosition: this.props.players.myPlayer.inventory.grenades.length-1})
        else if ((this.state.grenadesPosition + position) >= this.props.players.myPlayer.inventory.grenades.length) this.setState({...this.state, grenadesPosition: 0})
        else this.setState({...this.state, grenadesPosition: this.state.grenadesPosition + position})
    }

    toggleShowInfo() {
        this.setState({...this.state, showInfo: !this.state.showInfo})
    }

    toggleWeapon() {
        this.setState({...this.state, isWeapon: !this.state.isWeapon})
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
                setFightEffect: this.props.setFightEffect,
                setFightQueue: this.props.setFightQueue
            }
        )
        if (!this.props.players.shopLoaded) this.props.getShop()
    }

    toggleShowCoords() {
        this.setState({...this.state, showCoords: !this.state.showCoords})
    }
    toggleShowShop() {
        this.setState({...this.state, showShop: !this.state.showShop})
    }

    toggleShowEvent() {
        this.setState({...this.state, showEvent: !this.state.showEvent})
    }

    toggleShowInventory() {
        this.setState({...this.state, showInventory: !this.state.showInventory})
    }

    toggleShowFight() {
        this.setState({...this.state, showFight: !this.state.showFight})
    }

    toggleShowLocation() {
        this.setState({...this.state, showLocation: !this.state.showLocation})
    }

    toggleShowOrder() {
        this.setState({...this.state, showOrder: !this.state.showOrder})
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
                    currentEvent={this.props.players.currentEvent}
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
                    showEvent={this.state.showEvent}
                    toggleShowEvent={this.toggleShowEvent}
                    startFight={this.props.startFight}
                />
                <Interface
                    players={this.props.players}
                    makeRoll={this.props.makeRoll}
                    passMove={this.props.passMove}
                    event={this.props.players.currentEvent}
                    showEvent={this.props.showEvent}
                    toggleShowInventory={this.toggleShowInventory}
                    openStore={this.toggleShowShop}
                    medkitsPosition={this.state.medkitsPosition}
                    stimsPosition={this.state.stimsPosition}
                    grenadesPosition={this.state.grenadesPosition}
                    isWeapon={this.state.isWeapon}
                    toggleWeapon={this.toggleWeapon}
                    setMedkitsPosition={this.setMedkitsPosition}
                    setStimsPosition={this.setStimsPosition}
                    setGrenadesPosition={this.setGrenadesPosition}
                    useMedkit={this.props.useMedkit}
                    useStimulator={this.props.useStimulator}
                    setOrder={this.props.setOrder}
                    passOrder={this.props.passOrder}
                />
                <Store
                    players={this.props.players}
                    setItem={this.props.setItem}
                    closeStore={this.toggleShowShop}
                    showStore={this.state.showShop}
                />
                <Fight
                    showFight={this.state.showFight}
                    toggleShowFight={this.toggleShowFight}
                    useGrenade={this.props.useGrenade}
                    monster={this.props.monster}
                    players={this.props.players}
                    playerAttack={this.props.playerAttack}
                    monsterAttack={this.props.monsterAttack}
                    nextMember={this.props.nextMember}
                    playerDied={this.props.playerDied}
                    endFight={this.props.endFight}
                    isWeapon={this.state.isWeapon}
                />
                <MapLocation
                    myPlayer={this.props.players.myPlayer}
                    showLocation={this.state.showLocation}
                    toggleLocation={this.toggleShowLocation}
                />
                <Inventory
                    showInventory={this.state.showInventory}
                    toggleShowInventory={this.toggleShowInventory}
                    myPlayer={this.props.players.myPlayer}
                    removeItem={this.props.removeItem}
                    sellItem={this.props.sellItem}
                    setItemFromBackpack={this.props.setItemFromBackpack}
                    medkitsPosition={this.state.medkitsPosition}
                    stimsPosition={this.state.stimsPosition}
                    grenadesPosition={this.state.grenadesPosition}
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
        startFight,
        getShop,
        setItem,
        useMedkit,
        useStimulator,
        removeItem,
        sellItem,
        setItemFromBackpack,
        useGrenade,
        setFightEffect,
        setFightQueue,
        playerAttack,
        monsterAttack,
        nextMember,
        endFight,
        playerDied,
        setOrder,
        passOrder,
    }),
    withAuthMapRedirect
)(MapMultiplayerContainer) as React.ComponentType
