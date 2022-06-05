import {Player} from "../../../../redux/reducers/players-reducer";
import React from "react";
import {AuthInitialState} from "../../../../redux/reducers/auth-reducer";
import styles from "./index.module.css";

interface Props {
    player: Player | null
    auth: AuthInitialState
}

const PlayerInfo = ({player, auth}: Props) => {

    if (!player) return null

    let myPlayer = false
    if (player.userId === auth.userId) myPlayer = true

    return (
        <div className={styles.playerContainer}>
            {player.states.move ? <div className={styles.move}/> : <div/>}
            {myPlayer ? <div>{player.name + " (Вы)"}</div> : <div>{player.name}</div>}
        </div>
    )
}

export default PlayerInfo
