import {CurrentEvent, EventsType, Player} from "../../../redux/reducers/players-reducer";
import styles from "./Actions.module.css";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import HeaderTitle from "../../../components/common/Header/HeaderTitle";
import React from "react";
import TestButtons from "./TestButtons";

interface Props {
    players: Player[]
    auth: AuthInitialState
    makeRoll: (playerId: number) => void
    passMove: (eventType: EventsType) => void
    showCoords: boolean
    toggleShowCoords: () => void
    showEvent: (playerId: number) => void
    event: CurrentEvent
}

const Actions = (
    {
        players,
        auth,
        passMove,
        makeRoll,
        showCoords,
        toggleShowCoords,
        event,
        showEvent
    }: Props) => {

    let myPlayer: Player = players[0]
    let moveOrder: string = ""
    players.forEach((player) => {
        if (player.userId === auth.userId) myPlayer = player
        if (player.states.move) moveOrder = player.name
    })


    return (
        <div className={styles.container}>
            <section className={styles.buttonContainer}>
                <button disabled={!myPlayer.states.rollCube} onClick={() => makeRoll(myPlayer.id)}>
                    {"Бросить кубик"}
                </button>
                <button disabled={!myPlayer.states.move || myPlayer.states.inEvent} onClick={
                    () => myPlayer.states.alreadyMove
                        ? showEvent(myPlayer.id)
                        : passMove(event.type)
                }>
                    {"Пропустить ход"}
                </button>
            </section>
            <section className={styles.subContainer}>
                <div>
                    <HeaderTitle text={`Сейчас очередь ходить: ${moveOrder}`}/>
                </div>
                <TestButtons
                    event={event}
                    toggleShowCoords={toggleShowCoords}
                    showCoords={showCoords}
                    passMove={passMove}
                />
            </section>

        </div>
    )
}

export default Actions
