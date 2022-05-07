import {Player} from "../../../redux/reducers/players-reducer";
import React from "react";

interface Props {
    player: Player | null
}

const PlayerInfo = ({player}: Props) => {

    if (!player) return null

    const armor = player.effects.armorBoost
        + (player.inventory.bodyArmor ? player.inventory.bodyArmor?.def : 0)
        + (player.inventory.helmet ? player.inventory.helmet?.def : 0)

    const damage = player.effects.damageBoost
        + (player.inventory.weapon ? player.inventory.weapon?.damage : 0)
        + (player.inventory.weaponFirstLevelModifier ? player.inventory.weaponFirstLevelModifier?.damageModifier : 0)
        + (player.inventory.weaponSecondLevelModifier ? player.inventory.weaponSecondLevelModifier?.damageModifier : 0)
        + (player.inventory.weaponThirdLevelModifier ? player.inventory.weaponThirdLevelModifier?.damageModifier : 0)

    return (
        <div>
            <div>
                <span>{"Здоровье: "}</span>
                <span>{player.hp}</span>
            </div>
            <div>
                <span>{"Защита: "}</span>
                <span>{armor}</span>
            </div>
            <div>
                <span>{"Урон: "}</span>
                <span>{damage}</span>
            </div>
            <div>
                <span>{"Деньги: "}</span>
                <span>{player.money}</span>
            </div>
            <div>
                <span>{"Доступные ходы: "}</span>
                <span>{player.numberOfMoves}</span>
            </div>
        </div>
    )
}

export default PlayerInfo
