import styles from "./MainPlate.module.css";
import React from "react";
import '../../../../fonts/Boycott.otf';
import '../../../../fonts/perfoc_bold.otf';
import {CurrentEvent, EventsType, Player} from "../../../../redux/reducers/players-reducer";
import MovesCount from "./MovesCount";

interface Props {
    myPlayer: Player
    makeRoll: (playerId: number) => void
    passMove: (eventType: EventsType) => void
    showEvent: (playerId: number) => void
    event: CurrentEvent
    toggleWeapon: () => void
    isWeapon: boolean
}

const MainPlate = ({
    myPlayer,
    makeRoll,
    passMove,
    showEvent,
    event,
    toggleWeapon,
    isWeapon
}: Props) => {

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
                        () => myPlayer.states.alreadyMove
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
                            ? (myPlayer.inventory.weapon?.damage + '+'
                                + (myPlayer.effects.damageBoost
                                    + (myPlayer.inventory.weaponFirstLevelModifier?.damageModifier ?? 0)
                                    + (myPlayer.inventory.weaponSecondLevelModifier?.damageModifier ?? 0)
                                    + (myPlayer.inventory.weaponThirdLevelModifier?.damageModifier ?? 0)
                            ))
                            : myPlayer.inventory.grenades[0] ? (myPlayer.inventory.grenades[0].damage * myPlayer.inventory.grenades[0].damageBoost
                                + '+' + (myPlayer.effects.damageBoost + myPlayer.inventory.grenades[0].damageModifier)
                            ) : 0
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
                    {`Очередь ходить: `}
                </div>
            </section>
        </section>
    )
}

export default MainPlate
