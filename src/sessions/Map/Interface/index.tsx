import React from "react";
import {Player} from "../../../redux/reducers/players-reducer";
import styles from "./index.module.css";
import HeaderTitle from "../../../components/common/Header/HeaderTitle";
import PlayerInfo from "./PlayerInfo";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";

interface Props {
    players: Player[]
    auth: AuthInitialState
    showInfo: boolean
    toggleShowInfo: () => void
}

const InterfaceContainer = ({players, auth, toggleShowInfo, showInfo}: Props) => {

    let myPlayer: Player = players[0]
    players.forEach((player) => {
        if (player.userId === auth.userId) myPlayer = player
    })

    if (!showInfo) return (
        <div className={styles.container}>
            <button onClick={() => toggleShowInfo()}>
                {">"}
            </button>
        </div>
    )

    return (
        <div className={styles.container}>
            <section className={styles.playerInfo}>
                <div>
                    <HeaderTitle text={`Ваш персонаж: ${myPlayer.name}`}/>
                    <PlayerInfo player={myPlayer}/>
                </div>

            </section>
            <section className={styles.buttonSection}>
                <button onClick={() => toggleShowInfo()}>
                    {"<"}
                </button>
            </section>
        </div>
    )
}

export default InterfaceContainer
