import styles from "./Store.module.css";
import {ItemTypes} from "../../../api/Game/inventoryAPI";
import { Player } from "../../../redux/reducers/players-reducer";
import {weaponsNames} from "../../../consts/multiplayerSession";

interface ItemProps {
    id: number
    myPlayer: Player
    name: string
    place: string
    price: number
    damage?: number
    damageBoost?: number
    description?: string
    type: ItemTypes
    defense?: number
    effect?: string
    effectValue?: number
    weaponName?: weaponsNames
    damageModifier?: number
    setItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
}

const Item = (props: ItemProps) => {

    let disabled = props.myPlayer.money < props.price
    if (props.myPlayer.inventory.weapon && props.weaponName) {
        if (props.weaponName !== props.myPlayer.inventory.weapon?.name) disabled = true
    } else if (!props.myPlayer.inventory.weapon && props.weaponName) disabled = true
    if (!props.myPlayer.inventory.weaponFirstLevelModifier && props.type === "secondModifier") disabled = true
    if (!props.myPlayer.inventory.weaponSecondLevelModifier && props.type === "thirdModifier") disabled = true

    return (
        <div className={styles.gridContainer}>
            <div>{props.name}</div>
            <div>{props.defense || props.damage || props.effectValue || props.damageModifier}</div>
            <div className={styles.hiddenBlock}>{props.description || props.effect || props.weaponName}</div>
            <div>{props.price}</div>
            <button disabled={disabled} onClick={() => props.setItem(props.myPlayer.id, props.id, props.price, props.type)}>{"КУПИТЬ"}</button>
        </div>
    )
}

export default Item
