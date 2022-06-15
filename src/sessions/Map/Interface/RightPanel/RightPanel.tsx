import styles from "./RightPanel.module.css";
import {Player} from "../../../../redux/reducers/players-reducer";
import '../../../../fonts/Boycott.otf';

interface Props {
    myPlayer: Player
    setOrder: (playerId: number) => void
    passOrder: (playerId: number, place: "base" | "village" | "laboratory") => void
}

const RightPanel = ({myPlayer, setOrder, passOrder}: Props) => {

    let location: "base" | "village" | "laboratory" = "village"
    switch (myPlayer.coordinates.locationName) {
        case "Военная база": location = "base"
            break
        case "Лаборатория": location = "laboratory"
            break
        case "Посёлок": location = "village"
            break
    }

    const order = () => {
        if (!myPlayer.order) {
            let confirmOrder = window.confirm("Хотите взять заказ?")
            if (confirmOrder) {
                setOrder(myPlayer.id)
            }
        } else if (myPlayer.order && (myPlayer.order.progress === myPlayer.order.maxProgress) && ((myPlayer.coordinates.locationName === "Посёлок") || (myPlayer.coordinates.locationName === "Военная база") || (myPlayer.coordinates.locationName === "Лаборатория"))) {
            passOrder(myPlayer.id, location)
        }   else if (myPlayer.order) {
            alert("Ваш текущий заказ: " + myPlayer.order.title)
            alert("Описание заказа: " + myPlayer.order.text)
            alert("Что нужно сделать?" + myPlayer.order.description)
            alert("Места: " + `${myPlayer.order.firstPlace}${myPlayer.order.secondPlace ? ", " + myPlayer.order.secondPlace : ""}`)
        }
    }

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
                <div className={styles.subContainer}>
                    <span>{`Ком.`}</span>
                    <span>{myPlayer.inventory.compassDetail}</span>
                </div>
            </section>
            <section className={styles.orderContainer}>
                <div className={styles.order} onClick={() => order()}>
                    {myPlayer.order
                        ? (myPlayer.order.progress === myPlayer.order.maxProgress
                                ? (((myPlayer.coordinates.locationName === "Посёлок") || (myPlayer.coordinates.locationName === "Военная база") || (myPlayer.coordinates.locationName === "Лаборатория"))
                                    ? `Сдать заказ`
                                    : `Заказ выполнен`
                                )
                                : `Заказ: ${myPlayer.order.title}`
                        )
                        : `Нет активного заказа`
                    }
                </div>
            </section>
        </div>
    )
}

export default RightPanel
