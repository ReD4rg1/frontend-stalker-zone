import {Character, User} from "../../../redux/reducers/room-reducer"

export const sortChars = (characters: Character[]) => characters.sort(
    function (a, b) {
        if (a.id > b.id) {
            return 1
        } else return -1
    }
)

export const sortUsers = (users: User[]) => users.sort(
    function (a, b) {
        if (a.userId > b.userId) {
            return 1
        } else return -1
    }
)