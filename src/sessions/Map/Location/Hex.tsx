import {AvailableHexes, IHex} from "../../../redux/reducers/map-reducer";
import styles from "./Hex.module.css";
import {CurrentEvent, Player} from "../../../redux/reducers/players-reducer";
import HexSideDiff from "./HexSideDiff/HexSideDiff";
import getSideByCoords from "../../../redux/logic/angleEvent";

interface IProps {
    data: IHex
    myPlayer: Player
    players: Player[]
    availableHexes: AvailableHexes
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number, locationName: string) => void
    showCoords: boolean
    currentEvent: CurrentEvent
}

const Hex = (props: IProps) => {

    const item = props.data
    let hexStyle = styles.hex
    let availableMoveStatus: boolean = false
    let difficulty: number = 0
    props.availableHexes.coordinates.forEach((hex) => {
        if (!props.myPlayer.states.eventComplete && hex.moveId === item.hexId && hex.locationId === item.locationId && hex.move) {
            availableMoveStatus = true
            difficulty = hex.difficulty
        }
        if (props.myPlayer.states.eventComplete && (props.myPlayer.states.inEvent && props.currentEvent.type === "moveCard") && (hex.moveId === item.hexId && hex.locationId === item.locationId) && hex.side === getSideByCoords({playerCoords: {hexId: props.myPlayer.coordinates.hexId, locationId: props.myPlayer.coordinates.locationId}, finishCoords: {hexId: props.currentEvent.hexId, locationId: props.currentEvent.locationId}})) {
            availableMoveStatus = true
            difficulty = 0
        }
    })

    if (availableMoveStatus && !item.containLocation) hexStyle = styles.activeHex
    else if (availableMoveStatus && item.containLocation) hexStyle = styles.activeLocationHex
    else if (!availableMoveStatus && item.containLocation) hexStyle = styles.locationHex

    const players = props.players.map((player) => {
        if (player.coordinates.hexId === props.data.hexId
            && player.coordinates.locationId === props.data.locationId
        ) return player
        return null
    })

    const moveTo = () => {
        if (props.myPlayer.states.move && props.myPlayer.numberOfMoves > 0 && availableMoveStatus) {
            props.moveTo(
                props.data.locationId,
                props.data.hexId,
                difficulty,
                props.myPlayer.id,
                props.data.locationName,
            )
        }
    }

    const color = {
        0: "deepskyblue",
        1: "lime",
        2: "yellow",
        3: "red",
    }

    return (
        <div className={styles.container} id={`${props.data.hexId + '/' + props.data.locationId}`}>
            <div className={styles.subHex}>
                <div className={hexStyle} onClick={() => moveTo()}>
                    <div className={styles.infoBlock}>
                        <section>
                            {item.locationName
                                ? <div className={styles.location}>
                                    <div style={{color: color[item.locationLevel]}}>
                                        {item.locationName}
                                    </div>
                                </div>
                                : <div />
                            }
                            {props.showCoords
                                ? <div className={styles.coords}>
                                    <p className={styles.hexId}>{'Id: ' + item.hexId}</p>
                                    <p className={styles.hexId}>{'LocId: ' + item.locationId}</p>
                                </div>
                                : <div />
                            }
                        </section>
                        <section className={styles.players}>
                            {players?.map((player) => {
                                if (player) return (
                                    <div key={player.id} className={player.states.move
                                        ? styles.activePlayer
                                        : styles.player
                                    }>
                                        <div className={styles.playerDescription}>
                                            {player.name}
                                        </div>
                                    </div>
                                )
                                return null
                            })}
                        </section>
                    </div>
                    <section className={styles.topSide}>
                        <HexSideDiff difficulty={item.top.difficulty} type={"t"} />
                    </section>
                    <section className={styles.topLeftSide}>
                        <HexSideDiff difficulty={item.topLeft.difficulty} type={"tL"} />
                    </section>
                    <section className={styles.topRightSide}>
                        <HexSideDiff difficulty={item.topRight.difficulty} type={"tR"} />
                    </section>
                    <section className={styles.bottomSide}>
                        <HexSideDiff difficulty={item.bottom.difficulty} type={"b"} />
                    </section>
                    <section className={styles.bottomLeftSide}>
                        <HexSideDiff difficulty={item.bottomLeft.difficulty} type={"bL"} />
                    </section>
                    <section className={styles.bottomRightSide}>
                        <HexSideDiff difficulty={item.bottomRight.difficulty} type={"bR"} />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Hex
