import {IHex} from "../../../redux/reducers/map-reducer";
import styles from "./Hex.module.css";

interface IProps {
    data: IHex
}

const Hex = (props: IProps) => {

    const item = props.data
    let hexStyle = styles.hex

    if (item.isActive && !item.isLocation) hexStyle = styles.activeHex
    else if (item.isActive && item.isLocation) hexStyle = styles.activeLocationHex
    else if (!item.isActive && item.isLocation) hexStyle = styles.locationHex

    return (
        <div className={styles.container}>
            <div className={styles.subHex}>
                <div className={hexStyle}>
                    <div className={styles.infoBlock}>
                        <p className={styles.hexId}>{item.locationName}</p>
                        <p className={styles.hexId}>{'Id: ' + item.HexId}</p>
                        <section className={styles.players}>
                            {item.players?.map((player) => {
                                return (
                                    <div key={player.playerId} className={player.hisTurn ? styles.player : styles.activePlayer} style={{backgroundColor: `#69b${player.playerId}d5`}}>
                                        <span className={styles.playerDescription}>{player.playerName}</span>
                                    </div>
                                )
                            })}
                        </section>
                    </div>
                    <section className={styles.topSide}>
                        <span>{item.Top.difficulty}</span>
                    </section>
                    <section className={styles.topLeftSide}>
                        <span>{item.TopLeft.difficulty}</span>
                    </section>
                    <section className={styles.topRightSide}>
                        <span>{item.TopRight.difficulty}</span>
                    </section>
                    <section className={styles.bottomSide}>
                        <span>{item.Bottom.difficulty}</span>
                    </section>
                    <section className={styles.bottomLeftSide}>
                        <span>{item.BottomLeft.difficulty}</span>
                    </section>
                    <section className={styles.bottomRightSide}>
                        <span>{item.BottomRight.difficulty}</span>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Hex
