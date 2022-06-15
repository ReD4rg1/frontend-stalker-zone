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
    toggleShowInventory: () => void
    event: CurrentEvent
    openStore: () => void
    setMedkitsPosition: (position: number) => void
    setStimsPosition: (position: number) => void
    medkitsPosition: number
    stimsPosition: number
    grenadesPosition: number
    isWeapon: boolean
    toggleWeapon: () => void
    useMedkit: (playerId: number, medkitId: number) => void
    useStimulator: (playerId: number, stimulatorId: number) => void
    setGrenadesPosition: (position: number) => void

    setOrder: (playerId: number) => void
    passOrder: (playerId: number, place: "base" | "village" | "laboratory") => void
}

const Interface = ({
    players,
    passMove,
    makeRoll,
    event,
    showEvent,
    openStore,
    medkitsPosition,
    stimsPosition,
    setMedkitsPosition,
    setStimsPosition,
    useMedkit,
    useStimulator,
    grenadesPosition,
    setGrenadesPosition,
    toggleShowInventory,
    isWeapon,
    toggleWeapon,
    setOrder,
    passOrder,
}: Props) => {

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
                players={players}
                makeRoll={makeRoll}
                passMove={passMove}
                event={event}
                showEvent={showEvent}
                toggleShowInventory={toggleShowInventory}
                isWeapon={isWeapon}
                toggleWeapon={toggleWeapon}
                openStore={openStore}
                medkitsPosition={medkitsPosition}
                stimsPosition={stimsPosition}
                setStimsPosition={setStimsPosition}
                setMedkitsPosition={setMedkitsPosition}
                useStimulator={useStimulator}
                useMedkit={useMedkit}
                grenadesPosition={grenadesPosition}
                setGrenadesPosition={setGrenadesPosition}
            />
            <RightPanel
                myPlayer={players.myPlayer}
                setOrder={setOrder}
                passOrder={passOrder}
            />
            <Scanner
                myPlayer={players.myPlayer}
            />
        </div>
    )
}

export default Interface
