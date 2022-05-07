import { Player } from "../../../redux/reducers/players-reducer";
import styles from "./Actions.module.css";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import HeaderTitle from "../../../components/common/Header/HeaderTitle";
import React from "react";

interface Props {
    players: Player[]
    auth: AuthInitialState
    makeRoll: (playerId: number) => void
    passMove: () => void
}

const Actions = ({players, auth, passMove, makeRoll}: Props) => {

    let myPlayer: Player = players[0]
    let moveOrder: string = ""
    players.forEach((player) => {
        if (player.userId === auth.userId) myPlayer = player
        if (player.move) moveOrder = player.name
    })


    return (
        <div className={styles.container}>
            <section className={styles.buttonContainer}>
                <button disabled={!myPlayer.rollCube} onClick={() => makeRoll(myPlayer.id)}>
                    {"Бросить кубик"}
                </button>
                <button disabled={!myPlayer.move} onClick={() => passMove()}>
                    {"Пропустить ход"}
                </button>
            </section>
            <section>
                <div>
                    <HeaderTitle text={`Сейчас очередь ходить: ${moveOrder}`}/>
                </div>
            </section>

        </div>
    )
}

export default Actions
