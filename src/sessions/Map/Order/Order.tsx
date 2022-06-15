import styles from "./Order.module.css";
import {Player} from "../../../redux/reducers/players-reducer";

interface Props {
    showOrder: boolean
    toggleShowOrder: () => void
    myPlayer: Player
}

const Order = ({showOrder, toggleShowOrder, myPlayer}:Props) => {

    if (!showOrder && myPlayer.order) return (
        <button className={styles.orderButton} onClick={toggleShowOrder}>
            {"Ваш заказ"}
        </button>
    )

    if (showOrder && myPlayer.order) return (
        <div className={styles.container}>
            <section className={styles.orderSection}>
                <div className={styles.title}>
                    {"ЗАКАЗ"}
                </div>
                <div className={styles.orderItem}>
                    <div>{"Ваш текущий заказ"}</div>
                    <div>{myPlayer.order.title}</div>
                </div>
                <div className={styles.orderItem}>
                    <div>{"Описание заказа"}</div>
                    <div>{myPlayer.order.text}</div>
                </div>
                <div className={styles.orderItem}>
                    <div>{"Что нужно сделать?"}</div>
                    <div>{myPlayer.order.description}</div>
                </div>
                <div className={styles.orderItem}>
                    <div>{"Места"}</div>
                    <div>{`${myPlayer.order.firstPlace}${myPlayer.order.secondPlace ? ", " + myPlayer.order.secondPlace : ""}`}</div>
                </div>
                <div className={styles.orderItem}>
                    <div>{"Статус"}</div>
                    <div>{myPlayer.order.progress + "/" + myPlayer.order.maxProgress}</div>
                </div>
            </section>
            <div className={styles.closeButton}>
                <button onClick={toggleShowOrder}>{"закрыть"}</button>
            </div>
        </div>
    )

    return null
}

export default Order
