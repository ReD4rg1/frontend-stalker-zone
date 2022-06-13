import styles from "./Inventory.module.css";
import {Player} from "../../../redux/reducers/players-reducer";
import {ItemTypes} from "../../../api/Game/inventoryAPI";

interface Props {
    myPlayer: Player
    sellItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
    setItemFromBackpack: (playerId: number, itemId: number, type: ItemTypes) => void
}

const Backpack = ({myPlayer, sellItem, setItemFromBackpack}: Props) => {

    let enableSell = false
    if (myPlayer.coordinates.locationName === "Посёлок"
        || myPlayer.coordinates.locationName === "Военная база"
        || myPlayer.coordinates.locationName === "Лаборатория"
    ) enableSell = true

    return (
        <div className={styles.backpackContainer}>
            <div className={styles.border}>
                {"Снаряжение в рюкзаке"}
            </div>
            {myPlayer.backpack.helmets.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Защита головы"}</div>
                    <div>{item.name}</div>
                    <div>{"+ "+item.defence+" к защите"}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.helmet !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "Голова")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "Голова")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.bodyArmors.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Защита корпуса"}</div>
                    <div>{item.name}</div>
                    <div>{"+ "+item.defence+" к защите"}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.bodyArmor !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "Корпус")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "Корпус")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.weapons.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Оружие"}</div>
                    <div>{item.name}</div>
                    <div>{item.damage+" урона"}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.weapon !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "weapon")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "weapon")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.weaponFirstLevelModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Мод 1 ур."}</div>
                    <div>{item.name}</div>
                    <div>{"+ "+item.damageModifier+" к урону"}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={(myPlayer.inventory.weaponFirstLevelModifier !== null) || (item.weaponName !== myPlayer.inventory.weapon?.name)} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "firstModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "firstModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.weaponSecondLevelModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Мод 2 ур."}</div>
                    <div>{item.name}</div>
                    <div>{"+ "+item.damageModifier+" к урону"}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={(myPlayer.inventory.weaponFirstLevelModifier === null) || (myPlayer.inventory.weaponSecondLevelModifier !== null) || (item.weaponName !== myPlayer.inventory.weapon?.name)} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "secondModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "secondModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.weaponThirdLevelModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Мод 3 ур."}</div>
                    <div>{item.name}</div>
                    <div>{"+ "+item.damageModifier+" к урону"}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={(myPlayer.inventory.weaponSecondLevelModifier === null) || (myPlayer.inventory.weaponThirdLevelModifier !== null) || (item.weaponName !== myPlayer.inventory.weapon?.name)} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "thirdModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "thirdModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.teleports.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Быстрое перемещение"}</div>
                    <div>{item.name}</div>
                    <div>{item.location}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.teleport !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "teleport")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "teleport")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.mapModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Карта бонус"}</div>
                    <div>{item.name}</div>
                    <div>{item.effect}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.mapModifier !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "mapModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "mapModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.locationModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Локация бонус"}</div>
                    <div>{item.name}</div>
                    <div>{item.effect}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.locationModifier !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "locationModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "locationModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.trapModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Ловушки бонус"}</div>
                    <div>{item.name}</div>
                    <div>{item.effect}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.trapModifier !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "trapModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "trapModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.stealthModifiers.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Скрытность бонус"}</div>
                    <div>{item.name}</div>
                    <div>{item.effect}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.stealthModifier !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "stealthModifier")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "stealthModifier")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.grenades.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Граната"}</div>
                    <div>{item.name}</div>
                    <div>{item.damage+"x"+item.damageBoost+"+"+item.damageModifier}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.grenades.length === 5} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "grenade")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "grenade")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.stimulants.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Стимулятор"}</div>
                    <div>{item.name}</div>
                    <div>{item.effect}</div>
                    <div>{item.price/2+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.stimulants.length === 5} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "stimulator")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price/2, "stimulator")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.artifacts.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Артефакт"}</div>
                    <div>{item.name}</div>
                    <div>{item.effect}</div>
                    <div>{item.price+"$"}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={myPlayer.inventory.artifact !== null} onClick={() => setItemFromBackpack(myPlayer.id, item.id, "artifact")}>{"Экипировать"}</button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price, "artifact")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
            {myPlayer.backpack.trophies.map((item, index) => (
                <div className={styles.backpackItemContainer} key={item.id+item.name+index}>
                    <div>{"Трофеи"}</div>
                    <div>{item.name}</div>
                    <div>{""}</div>
                    <div>{item.price+"$"}</div>
                    <div className={styles.buttonContainer}>{""}</div>
                    <div className={styles.buttonContainer}>
                        <button disabled={!enableSell} onClick={() => sellItem(myPlayer.id, item.id, item.price, "trophy")}>{"Продать"}</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Backpack
