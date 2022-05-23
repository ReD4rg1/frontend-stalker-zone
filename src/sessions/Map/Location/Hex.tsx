import {AvailableHexes, IHex} from "../../../redux/reducers/map-reducer";
import styles from "./Hex.module.css";
import {Player} from "../../../redux/reducers/players-reducer";
import HexSideDiff from "./HexSideDiff/HexSideDiff";

interface IProps {
    data: IHex
    myPlayer: Player
    players: Player[]
    availableHexes: AvailableHexes
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
    showCoords: boolean
}

const Hex = (props: IProps) => {

    const item = props.data
    let hexStyle = styles.hex
    let availableMoveStatus: boolean = false
    let difficulty: number = 0
    props.availableHexes.coordinates.forEach((hex) => {
        if (hex.moveId === props.data.hexId && hex.locationId === props.data.locationId && hex.move) {
            availableMoveStatus = true
            difficulty = hex.difficulty
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
            )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.subHex}>
                <div className={hexStyle} onClick={() => moveTo()}>
                    <div className={styles.infoBlock}>
                        {props.showCoords
                            ? <div>
                                <p className={styles.location}>{item.locationName}</p>
                                <p className={styles.hexId}>{'Id: ' + item.hexId}</p>
                                <p className={styles.hexId}>{'LocId: ' + item.locationId}</p>
                            </div>
                            : <div />
                        }

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
