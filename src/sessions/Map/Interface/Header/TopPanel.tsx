import React from "react";
import {Player} from "../../../../redux/reducers/players-reducer";
import styles from "./index.module.css";
import PlayerInfo from "./PlayerInfo";
import {AuthInitialState} from "../../../../redux/reducers/auth-reducer";
import diceRollImg from "../../../../assets/img/buttonIcons/diceRoll.png";

interface Props {
    players: Player[]
    auth: AuthInitialState
}

const TopPanel = ({players, auth}: Props) => {

    let playersInfo = players.map((player) => {
        return <PlayerInfo player={player} auth={auth} key={player.id}/>
    })

    let numberOfMoves = 0
    players.forEach((player) => {
        if (player.numberOfMoves !== 0) numberOfMoves = player.numberOfMoves
    })

    return (
        <div>
            <div className={styles.container}>
                <section className={styles.playersInfo}>
                    {playersInfo}
                </section>
            </div>
            <div className={styles.rollCount}>
                <img src={diceRollImg} alt={""}/>
                <div>{" : " + numberOfMoves}</div>
            </div>
        </div>
    )
}

export default TopPanel
