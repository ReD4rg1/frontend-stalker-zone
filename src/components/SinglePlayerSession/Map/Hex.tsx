import {IHex} from "../../../redux/map-reducer";
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