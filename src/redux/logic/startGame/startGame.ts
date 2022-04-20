import {User} from "../../reducers/room-reducer"

const readyStatus = (user: User) => {
    return user.readyStatus
}

interface Props {
    users: User[]
    StartGame: () => void
}

export const CheckStartGame = ({users, StartGame}: Props) => {
    if (users.length >= 2 && users.every(readyStatus)) {
        StartGame()
    }
}