import styles from "./TestButtons.module.css";
import React from "react";
import {updateWS} from "../../../api/Game/ws/gameWS";
import {CurrentEvent, EventsType} from "../../../redux/reducers/players-reducer";

interface Props {
    event: CurrentEvent
    toggleShowCoords: () => void
    showCoords: boolean
    passMove: (eventType: EventsType) => void
    requestMonster: (level: number) => void
}

const TestButtons = ({toggleShowCoords, showCoords, event, passMove, requestMonster}: Props) => {
    return (
        <section className={styles.testContainer}>
            <button onClick={toggleShowCoords}>
                {showCoords ? "Скрыть координаты" : "Показать координаты"}
            </button>
            <button onClick={() => updateWS()}>
                {"Обновить WS"}
            </button>
            <button onClick={() => passMove(event.type)}>
                {"Передать ход"}
            </button>
            <button onClick={() => requestMonster(1)}>
                {"Получить монстра"}
            </button>
        </section>
    )
}

export default TestButtons
