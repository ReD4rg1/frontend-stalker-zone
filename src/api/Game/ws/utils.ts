import {Player} from "../../../redux/reducers/players-reducer";

export const sortPlayers = (players: Player[]) => players.sort(
    function (a, b) {
        if (a.userId > b.userId) {
            return 1
        } else return -1
    }
)
