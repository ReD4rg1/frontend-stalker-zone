import {IHex} from "../../../redux/reducers/map-reducer";
import styles from "./Hex.module.css";

interface IProps {
    data: IHex
}

const Hex = (props: IProps) => {

    const item = props.data
    let hexStyle = styles.hex

    if (item.active && !item.containLocation) hexStyle = styles.activeHex
    else if (item.active && item.containLocation) hexStyle = styles.activeLocationHex
    else if (!item.active && item.containLocation) hexStyle = styles.locationHex

    return (
        <div className={styles.container}>
            <div className={styles.subHex}>
                <div className={hexStyle}>
                    <div className={styles.infoBlock}>
                        <p className={styles.hexId}>{item.locationName}</p>
                        <p className={styles.hexId}>{'Id: ' + item.hexId}</p>
                        <p className={styles.hexId}>{'LocationId: ' + item.locationId}</p>
                        <section className={styles.players}>
                            {item.playerList?.map((player) => {
                                return (
                                    <div key={player} className={styles.player}/>
                                )
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
