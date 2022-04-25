import players from "../Objects/Players/players.json"
import {Player} from "../reducers/players-reducer";

export const createAndAddPlayers = (playersNumberArray: Array<number>): Array<Player> => {

    return  playersNumberArray.map((item) => {

        return (
            {
                playerId: players[item-1].playerId,
                playerName: players[item-1].playerName,
                playerHP: players[item-1].playerEffects.maxHp,
                playerReputation: 0,
                playerPowerReserve: 0,
                playerActiveOrder: null,
                playerMoney: players[item-1].playerEffects.seedMoney,
                isSkipping: false,
                hisTurn: false,
                playerEffects: {
                    healBoost: players[item-1].playerEffects.healBoost,
                    mapMoveModifier: players[item-1].playerEffects.mapMoveModifier,
                    damageBoost: players[item-1].playerEffects.damageBoost,
                    armorBoost: players[item-1].playerEffects.armorBoost,
                    seedMoney: players[item-1].playerEffects.seedMoney,
                    maxHp: players[item-1].playerEffects.maxHp,
                    secrecyBoost: players[item-1].playerEffects.secrecyBoost,
                },
                inventory: {
                    helmet: null,
                    bodyArmor: null,
                    weapon: null,
                    weaponFirstLevelModifier: null,
                    weaponSecondLevelModifier: null,
                    weaponThirdLevelModifier: null,
                    grenade: null,
                    healBox: null,
                    stimulator: null,
                    secrecy: null,
                    mapMovesModifier: null,
                    locationMovesModifier: null,
                    teleport: null,
                    Artifact: null,
                }
            }
        )
    })
}

export const showInitPlayersInfo = () => {

    return players.map(item => {

        return (
            {
                playerId: item.playerId,
                playerName: item.playerName,
                playerEffects: {
                    healBoost: item.playerEffects.healBoost,
                    mapMoveModifier: item.playerEffects.mapMoveModifier,
                    damageBoost: item.playerEffects.damageBoost,
                    armorBoost: item.playerEffects.armorBoost,
                    seedMoney: item.playerEffects.seedMoney,
                    maxHp: item.playerEffects.maxHp,
                    secrecyBoost: item.playerEffects.secrecyBoost
                }
            }
        )
    })
}
