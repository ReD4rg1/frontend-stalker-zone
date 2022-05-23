import players from "../Objects/Players/players.json"
import {Player} from "../reducers/players-reducer";

export const createAndAddPlayers = (playersNumberArray: Array<number>): Array<Player> => {

    return  playersNumberArray.map((item): Player => {

        return (
            {
                id: players[item-1].id,
                userId: players[item-1].id,
                name: players[item-1].name,
                hp: players[item-1].effects.maxHp,
                reputation: 0,
                numberOfMoves: 0,
                order: null,
                money: players[item-1].effects.seedMoney,
                states: {
                    skipping: false,
                    inFight: false,
                    move: false,
                    rollCube: false,
                    alreadyMove: false,
                    inEvent: false,
                    anotherMove: false,
                    alreadyThrowCube: false,
                    eventComplete: false,
                },
                effects: {
                    healBoost: players[item-1].effects.healBoost,
                    mapMoveModifier: players[item-1].effects.mapMoveModifier,
                    damageBoost: players[item-1].effects.damageBoost,
                    armorBoost: players[item-1].effects.armorBoost,
                    seedMoney: players[item-1].effects.seedMoney,
                    maxHp: players[item-1].effects.maxHp,
                    secrecyBoost: players[item-1].effects.secrecyBoost,
                    locationMoveModifier: 0,
                },
                inventory: {
                    helmet: null,
                    bodyArmor: null,
                    weapon: null,
                    weaponFirstLevelModifier: null,
                    weaponSecondLevelModifier: null,
                    weaponThirdLevelModifier: null,
                    grenades: [],
                    healBoxes: [],
                    stimulators: [],
                    teleport: null,
                    artifact: null,
                    otherItems: [],
                },
                coordinates: {
                    locationId: 4,
                    hexId: 19
                },
            }
        )
    })
}

export const showInitPlayersInfo = () => {

    return players.map(item => {

        return (
            {
                id: item.id,
                name: item.name,
                effects: {
                    healBoost: item.effects.healBoost,
                    mapMoveModifier: item.effects.mapMoveModifier,
                    damageBoost: item.effects.damageBoost,
                    armorBoost: item.effects.armorBoost,
                    seedMoney: item.effects.seedMoney,
                    maxHp: item.effects.maxHp,
                    secrecyBoost: item.effects.secrecyBoost
                }
            }
        )
    })
}
