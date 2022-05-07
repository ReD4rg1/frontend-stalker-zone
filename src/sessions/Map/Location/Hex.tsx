import {AvailableHexes, IHex} from "../../../redux/reducers/map-reducer";
import styles from "./Hex.module.css";
import {Player} from "../../../redux/reducers/players-reducer";

interface IProps {
    data: IHex
    myPlayer: Player
    players: Player[]
    availableHexes: AvailableHexes
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
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
        if (props.myPlayer.move) {
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
                        <p className={styles.hexId}>{item.locationName}</p>
                        <p className={styles.hexId}>{'Id: ' + item.hexId}</p>
                        <p className={styles.hexId}>{'LocationId: ' + item.locationId}</p>
                        <section className={styles.players}>
                            {players?.map((player) => {
                                if (player) return (
                                    <div key={player.id} className={player.move
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
                        <span>{item.top.difficulty}</span>
                    </section>
                    <section className={styles.topLeftSide}>
                        <span>{item.topLeft.difficulty}</span>
                    </section>
                    <section className={styles.topRightSide}>
                        <span>{item.topRight.difficulty}</span>
                    </section>
                    <section className={styles.bottomSide}>
                        <span>{item.bottom.difficulty}</span>
                    </section>
                    <section className={styles.bottomLeftSide}>
                        <span>{item.bottomLeft.difficulty}</span>
                    </section>
                    <section className={styles.bottomRightSide}>
                        <span>{item.bottomRight.difficulty}</span>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Hex
