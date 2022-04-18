import {useEffect, useState} from "react";
import {bindUser, connect, disconnect, getChars} from "../../../api/Rooms/WebSocket/WebSocket";
import {Character, RoomInitialState, User} from "../../../redux/reducers/room-reducer";
import CharacterComponent from "./CharacterComponent";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import {PlayersInitialState} from "../../../redux/reducers/players-reducer";
import UserComponent from "./UserComponent";
import styles from "./index.module.css";

interface Props {
    auth: AuthInitialState
    players: PlayersInitialState
    rooms: RoomInitialState
    SetCharacters: (payload: Character[]) => void
    SetUsers: (payload: User[]) => void
}

const MenuContainer = ({auth, rooms, SetCharacters, SetUsers}: Props) => {
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        connect({setConnected, SetCharacters, SetUsers})
        return () => disconnect()
    }, [])

    useEffect(() => {
        if (connected) {
            getChars(0)
            bindUser(0, 0)
        }
    }, [connected])

    return (
        <div className={styles.mainContainer}>
            <section>
                {rooms.currentRoom.charactersList.map((char) =>
                    <CharacterComponent char={char} key={char.id} userId={auth.userId} />
                )}
            </section>
            <section>
                {rooms.currentRoom.usersList.map((user) =>
                    <UserComponent user={user} key={user.userId} />
                )}
            </section>
        </div>
    )
}

export default MenuContainer
