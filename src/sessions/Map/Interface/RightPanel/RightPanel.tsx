import styles from "./RightPanel.module.css";
import {Player} from "../../../../redux/reducers/players-reducer";
import '../../../../fonts/Boycott.otf';

interface Props {
    myPlayer: Player
}

const RightPanel = ({myPlayer}: Props) => {

    return (
        <div>
            <section className={styles.HPContainer}>
                <div style={{
                    borderRadius: `10px`,
                    backgroundColor: `#ff000070`,
                    height: `100%`,
                    width: `${myPlayer.hp > 0 ? (myPlayer.hp / myPlayer.effects.maxHp * 100) : 0}%`,
                }}/>
                <div className={styles.HP}>{`${myPlayer.hp}/${myPlayer.effects.maxHp}`}</div>
            </section>
            <section className={styles.rightContainer}>
                <div className={styles.subContainer}>
                    <span>{`$`}</span>
                    <span>{myPlayer.money}</span>
                </div>
                <div className={styles.subContainer}>
                    <span>{`Реп.`}</span>
                    <span>{myPlayer.reputation}</span>
                </div>
            </section>
            <section className={styles.orderContainer}>
                <div className={styles.order}>
                    {myPlayer.order ? `Заказ: ${myPlayer.order}` : `Нет активного заказа`}
                </div>
            </section>
        </div>
    )
}

export default RightPanel
