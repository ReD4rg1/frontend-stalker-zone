import styles from "./index.module.css";
import mainPanelL from "../../../assets/img/interface/mainPanelL.png";
import mainPanelR from "../../../assets/img/interface/mainPanelR.png";
import '../../../fonts/Boycott.otf';
import {CurrentEvent, EventsType, PlayersInitialState} from "../../../redux/reducers/players-reducer";
import React, { useState } from "react";
import MainPlate from "./MainPlate/MainPlate";
import RightPanel from "./RightPanel/RightPanel";
import Scanner from "./Scanner/Scanner";

interface Props {
    players: PlayersInitialState
    makeRoll: (playerId: number) => void
    passMove: (eventType: EventsType) => void
    showEvent: (playerId: number) => void
    event: CurrentEvent
}

const Interface = ({players, passMove, makeRoll, event, showEvent}: Props) => {

    const [isWeapon, setIsWeapon] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.backgroundL}>
                    <img src={mainPanelL} alt={""}/>
                </div>
                <div className={styles.backgroundR}>
                    <img src={mainPanelR} alt={""}/>
                </div>
            </div>
            <MainPlate
                myPlayer={players.myPlayer}
                makeRoll={makeRoll}
                passMove={passMove}
                event={event}
                showEvent={showEvent}
                isWeapon={isWeapon}
                toggleWeapon={() => setIsWeapon(!isWeapon)}
            />
            <RightPanel
                myPlayer={players.myPlayer}
            />
            <Scanner
                myPlayer={players.myPlayer}
            />
        </div>
    )
}

export default Interface
