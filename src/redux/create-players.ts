import players from "./Objects/Players/players.json"

export const createPlayers = () => {

}

export const showInitPlayersInfo = () => {
    const playersArray = players.map(item => {
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

    return playersArray
}