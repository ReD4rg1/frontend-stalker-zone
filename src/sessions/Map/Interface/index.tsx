import React from "react";
import {Player} from "../../../redux/reducers/players-reducer";
import styles from "./index.module.css";
import HeaderTitle from "../../../components/common/Header/HeaderTitle";
import PlayerInfo from "./PlayerInfo";

interface Props {
    players: Player[]
}

const InterfaceContainer = ({players}: Props) => {
    return (
        <div className={styles.container}>
            <section className={styles.playerInfo}>
                <HeaderTitle text={players[0].name}/>
                <PlayerInfo player={players[0]}/>
            </section>
            <section>

            </section>
        </div>
    )
}

export default InterfaceContainer