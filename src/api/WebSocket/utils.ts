import { Character } from "../../redux/reducers/room-reducer"

export const sort = (characters: Character[]) => characters.sort(
    function (a, b) {
        if (a.id > b.id) {
            return 1
        } else return -1
    }
)
