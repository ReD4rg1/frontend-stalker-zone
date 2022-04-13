import {Character} from "./WebSocket";

export const sort = (characters: Character[]) => characters.sort(
    function (a, b) {
        if (a.id > b.id) {
            return 1
        } else return -1
    }
)
