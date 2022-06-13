import styles from "./MainPlate.module.css";
import React from "react";
import '../../../../fonts/Boycott.otf';
import '../../../../fonts/perfoc_bold.otf';
import {CurrentEvent, EventsType, Player, PlayersInitialState} from "../../../../redux/reducers/players-reducer";
import MovesCount from "./MovesCount";
import Weapon from "./ItemsOnPanel/Weapon";
import Medkits from "./ItemsOnPanel/Medkits";

interface Props {
    players: PlayersInitialState
    makeRoll: (playerId: number) => void
    passMove: (eventType: EventsType) => void
    showEvent: (playerId: number) => void
    event: CurrentEvent
    toggleWeapon: () => void
    isWeapon: boolean
    openStore: () => void
    setMedkitsPosition: (position: number) => void
    setStimsPosition: (position: number) => void
    medkitsPosition: number
    stimsPosition: number
    useMedkit: (playerId: number, medkitId: number) => void
    useStimulator: (playerId: number, stimulatorId: number) => void
}

const MainPlate = ({
    players,
    makeRoll,
    passMove,
    showEvent,
    event,
    toggleWeapon,
    isWeapon,
    openStore,
    medkitsPosition,
    stimsPosition,
    setMedkitsPosition,
    setStimsPosition,
    useMedkit,
    useStimulator,
}: Props) => {

    let currentMove = "Ваша очередь ходить"
    let myPlayer = players.myPlayer

    players.players.forEach((player) => {
        if (player.states.move && player.name !== myPlayer.name) currentMove = `Очередь ходить: ${player.name}`
    })

    let buttonIsAvailable = (myPlayer: Player): boolean => {

        if (myPlayer.coordinates.locationName === "Посёлок") return true
        else if (myPlayer.coordinates.locationName === "Военная база" && myPlayer.reputation > 2) return true
        else if (myPlayer.coordinates.locationName === "Лаборатория" && myPlayer.reputation > 5) return true

        return false
    }

    return (
        <section className={styles.actions}>
            <section className={styles.rollCube}>
                {myPlayer.states.rollCube
                    ? <button onClick={() => makeRoll(myPlayer.id)}
                              className={styles.rollCubeActiveBt}
                    >{"Ход"}</button>
                    : <button>{myPlayer.states.move ? myPlayer.numberOfMoves : ""}</button>
                }
            </section>
            <section className={styles.passMove}>
                {(myPlayer.states.move && !myPlayer.states.inEvent)
                    ? <button onClick={
                        () => myPlayer.states.alreadyMove && !buttonIsAvailable(myPlayer)
                            ? showEvent(myPlayer.id)
                            : passMove(event.type)
                    }
                              className={styles.passMoveActiveBt}
                    />
                    : <button/>
                }
            </section>
            <MovesCount count={myPlayer.numberOfMoves} />
            <section className={styles.stats}>
                <div>
                    {"АТК: " + (isWeapon
                            ? (myPlayer.inventory.weapon
                                ? (myPlayer.inventory.weapon?.damage + '+'
                                        + (myPlayer.effects.damageBoost
                                            + (myPlayer.inventory.weaponFirstLevelModifier?.damageModifier ?? 0)
                                            + (myPlayer.inventory.weaponSecondLevelModifier?.damageModifier ?? 0)
                                            + (myPlayer.inventory.weaponThirdLevelModifier?.damageModifier ?? 0)
                                        ))
                                : ("1" + (myPlayer.effects.damageBoost - 2))
                            )
                            : myPlayer.inventory.grenades[0] ? (myPlayer.inventory.grenades[0].damage * myPlayer.inventory.grenades[0].damageBoost
                                + '+' + (myPlayer.effects.damageBoost + myPlayer.inventory.grenades[0].damageModifier)
                            ) : ("1" + (myPlayer.effects.damageBoost - 2))
                    )
                    }
                </div>
                <div>
                    {"ЗАЩ: " + ((myPlayer.inventory.helmet?.defence ?? 0) + (myPlayer.inventory.bodyArmor?.defence ?? 0) + myPlayer.effects.armorBoost)}
                </div>
                <div>
                    {"СКР: " + (myPlayer.effects.secrecyBoost)}
                </div>
                <div>
                    {"ПЕР: " + (myPlayer.effects.mapMoveModifier)}
                </div>
                <div>
                    {"ЛОК: " + (myPlayer.effects.locationMoveModifier)}
                </div>
                <div>
                    {"ЛЕЧ: " + (myPlayer.effects.healBoost)}
                </div>
            </section>
            <section className={styles.monitor}>
                <div>
                    {currentMove}
                </div>
            </section>
            <Weapon
                isWeapon={isWeapon}
                toggleWeapon={toggleWeapon}
                myPlayer={myPlayer}
            />
            <Medkits
                medkitsPosition={medkitsPosition}
                stimsPosition={stimsPosition}
                myPlayer={myPlayer}
                setMedkitsPosition={setMedkitsPosition}
                setStimsPosition={setStimsPosition}
                stimulatorUse={useStimulator}
                medkitUse={useMedkit}
            />
            <button style={{display: `${buttonIsAvailable(myPlayer) ? "block" : "none"}`}} className={styles.store} onClick={() => openStore()}>
                {"МАГАЗИН"}
            </button>
        </section>
    )
}

export default MainPlate
