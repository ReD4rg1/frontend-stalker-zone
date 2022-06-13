import styles from "./Inventory.module.css";
import {Player} from "../../../redux/reducers/players-reducer";
import '../../../fonts/perfoc_bold.otf';
import {ItemTypes} from "../../../api/Game/inventoryAPI";
import Backpack from "./Backpack";

interface Props {
    showInventory: boolean
    toggleShowInventory: () => void
    myPlayer: Player
    removeItem: (playerId: number, itemId: number, price: number,type: ItemTypes) => void
    sellItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
    setItemFromBackpack: (playerId: number, itemId: number, type: ItemTypes) => void
    medkitsPosition: number
    stimsPosition: number
    grenadesPosition: number
}

const Inventory = ({
    showInventory,
    toggleShowInventory,
    myPlayer,
    removeItem,
    sellItem,
    setItemFromBackpack,
    medkitsPosition,
    stimsPosition,
    grenadesPosition,
}:Props) => {

    if (!showInventory) return null

    return (
        <div className={styles.container}>
            <button className={styles.exit} onClick={() => toggleShowInventory()}>{"<"}</button>
            <div className={styles.mainTitle}>
                <div>{"ВАШЕ СНАРЯЖЕНИЕ"}</div>
            </div>
            <div className={styles.mainSection}>
                <section className={styles.inventoryContainer}>
                    <section className={styles.border}>
                        {"СНАРЯЖЁННАЯ ЭКИПИРОВКА"}
                    </section>
                    <section className={styles.titleContainer}>
                        <div className={styles.background}>{"Назначение"}</div>
                        <div>{"Название"}</div>
                        <div>{"Характеристика"}</div>
                        <div>{"Стоимость"}</div>
                        <div/>
                    </section>
                    {myPlayer.inventory.helmet
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Защита головы"}</div>
                            <div>{myPlayer.inventory.helmet?.name}</div>
                            <div>{myPlayer.inventory.helmet?.defence}</div>
                            <div>{myPlayer.inventory.helmet?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.helmet?.id ?? 0, 0, "Голова")}>{"Снять"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.bodyArmor
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Защита тела"}</div>
                            <div>{myPlayer.inventory.bodyArmor?.name}</div>
                            <div>{myPlayer.inventory.bodyArmor?.defence}</div>
                            <div>{myPlayer.inventory.bodyArmor?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.bodyArmor?.id ?? 0, 0, "Корпус")}>{"Снять"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.weapon
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Оружие"}</div>
                            <div>{myPlayer.inventory.weapon?.name}</div>
                            <div>{myPlayer.inventory.weapon?.damage}</div>
                            <div>{myPlayer.inventory.weapon?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button
                                    disabled={(myPlayer.inventory.weaponFirstLevelModifier !== null) || (myPlayer.inventory.weaponSecondLevelModifier !== null) || (myPlayer.inventory.weaponThirdLevelModifier !== null)}
                                    onClick={() => removeItem(myPlayer.id, myPlayer.inventory.weapon?.id ?? 0, 0, "weapon")}
                                >{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.weaponFirstLevelModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Модификатор 1ур."}</div>
                            <div>{myPlayer.inventory.weaponFirstLevelModifier?.name}</div>
                            <div>{myPlayer.inventory.weaponFirstLevelModifier?.damageModifier}</div>
                            <div>{myPlayer.inventory.weaponFirstLevelModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button
                                    disabled={(myPlayer.inventory.weaponSecondLevelModifier !== null) || (myPlayer.inventory.weaponThirdLevelModifier !== null)}
                                    onClick={() => removeItem(myPlayer.id, myPlayer.inventory.weaponFirstLevelModifier?.id ?? 0, 0, "firstModifier")}
                                >{"Снять"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.weaponSecondLevelModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Модификатор 2ур."}</div>
                            <div>{myPlayer.inventory.weaponSecondLevelModifier?.name}</div>
                            <div>{myPlayer.inventory.weaponSecondLevelModifier?.damageModifier}</div>
                            <div>{myPlayer.inventory.weaponSecondLevelModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button
                                    disabled={(myPlayer.inventory.weaponThirdLevelModifier !== null)}
                                    onClick={() => removeItem(myPlayer.id, myPlayer.inventory.weaponSecondLevelModifier?.id ?? 0, 0, "secondModifier")}
                                >{"Снять"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.weaponThirdLevelModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Модификатор 3ур."}</div>
                            <div>{myPlayer.inventory.weaponThirdLevelModifier?.name}</div>
                            <div>{myPlayer.inventory.weaponThirdLevelModifier?.damageModifier}</div>
                            <div>{myPlayer.inventory.weaponThirdLevelModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.weaponThirdLevelModifier?.id ?? 0, 0, "thirdModifier")}>{"Снять"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.mapModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Перемещение по карте"}</div>
                            <div>{myPlayer.inventory.mapModifier?.name}</div>
                            <div>{myPlayer.inventory.mapModifier?.effect}</div>
                            <div>{myPlayer.inventory.mapModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.mapModifier?.id ?? 0, 0, "mapModifier")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.locationModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Перемещение по локации"}</div>
                            <div>{myPlayer.inventory.locationModifier?.name}</div>
                            <div>{myPlayer.inventory.locationModifier?.effect}</div>
                            <div>{myPlayer.inventory.locationModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.locationModifier?.id ?? 0, 0, "locationModifier")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.teleport
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Быстрое перемещение"}</div>
                            <div>{myPlayer.inventory.teleport?.name}</div>
                            <div>{myPlayer.inventory.teleport?.location}</div>
                            <div>{myPlayer.inventory.teleport?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.teleport?.id ?? 0, 0, "teleport")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.artifact
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Артефакт"}</div>
                            <div>{myPlayer.inventory.artifact?.name}</div>
                            <div>{myPlayer.inventory.artifact?.effect}</div>
                            <div>{myPlayer.inventory.artifact?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.artifact?.id ?? 0, 0, "artifact")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.trapModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Детекция"}</div>
                            <div>{myPlayer.inventory.trapModifier?.name}</div>
                            <div>{myPlayer.inventory.trapModifier?.effect}</div>
                            <div>{myPlayer.inventory.trapModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.trapModifier?.id ?? 0, 0, "trapModifier")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.stealthModifier
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Незаметность"}</div>
                            <div>{myPlayer.inventory.stealthModifier?.name}</div>
                            <div>{myPlayer.inventory.stealthModifier?.effect}</div>
                            <div>{myPlayer.inventory.stealthModifier?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.stealthModifier?.id ?? 0, 0, "stealthModifier")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.grenades[grenadesPosition]
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Гранаты"}</div>
                            <div>{myPlayer.inventory.grenades[grenadesPosition]?.name}</div>
                            <div>{myPlayer.inventory.grenades[grenadesPosition]?.damage + "x" + myPlayer.inventory.grenades[grenadesPosition]?.damageBoost + "+" + myPlayer.inventory.grenades[grenadesPosition]?.damageModifier}</div>
                            <div>{myPlayer.inventory.grenades[grenadesPosition]?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.grenades[grenadesPosition]?.id ?? 0, 0, "grenade")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.medkits[medkitsPosition]
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Аптечки"}</div>
                            <div>{myPlayer.inventory.medkits[medkitsPosition]?.name}</div>
                            <div>{myPlayer.inventory.medkits[medkitsPosition]?.effect}</div>
                            <div>{myPlayer.inventory.medkits[medkitsPosition]?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => sellItem(myPlayer.id, myPlayer.inventory.medkits[medkitsPosition]?.id ?? 0, (myPlayer.inventory.medkits[medkitsPosition]?.price / 2), "stimulator")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                    {myPlayer.inventory.stimulants[stimsPosition]
                        ? <section className={styles.inventoryItemContainer}>
                            <div className={styles.background}>{"Стимуляторы"}</div>
                            <div>{myPlayer.inventory.stimulants[stimsPosition]?.name}</div>
                            <div>{myPlayer.inventory.stimulants[stimsPosition]?.effect}</div>
                            <div>{myPlayer.inventory.stimulants[stimsPosition]?.price+"$"}</div>
                            <div className={styles.buttonContainer}>
                                <button onClick={() => removeItem(myPlayer.id, myPlayer.inventory.stimulants[stimsPosition]?.id ?? 0, 0, "stimulator")}>{"Убрать"}</button>
                            </div>
                        </section>
                        : <div/>
                    }
                </section>
                <Backpack
                    myPlayer={myPlayer}
                    sellItem={sellItem}
                    setItemFromBackpack={setItemFromBackpack}
                />
            </div>
        </div>
    )
}

export default Inventory
