import {Player} from "./reducers/players-reducer";

export const findMyPlayer = (players: Player[], userId: number): Player => {
    let myPlayer = players[0]
    players.forEach((player) => {
        if (player.userId === userId) myPlayer = player
    })

    return myPlayer
}
