import {useEffect, useState} from "react";
import {bindUser, connect, disconnect, getChars} from "../../../api/Rooms/WebSocket/WebSocket";
import {Character, RoomInitialState, User} from "../../../redux/reducers/room-reducer";
import CharacterComponent from "./CharacterComponent";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import {PlayersInitialState} from "../../../redux/reducers/players-reducer";
import UserComponent from "./UserComponent";

interface Props {
    auth: AuthInitialState
    players: PlayersInitialState
    rooms: RoomInitialState
}

const MenuContainer = ({auth, rooms}: Props) => {

    const [characters, setCharacters] = useState<Character[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        connect({setCharacters, setConnected, setUsers})
        return () => disconnect()
    }, [])

    useEffect(() => {
        if (connected) {
            getChars()
            bindUser(0, 0)
        }
    }, [connected])

    return (
        <div>
            <section>
                {characters.map((char) =>
                    <CharacterComponent char={char} key={char.id} userId={auth.userId} />
                )}
            </section>
            <section>
                {users.map((user) =>
                    <UserComponent user={user} key={user.userId} />
                )}
            </section>
        </div>
    )
}

export default MenuContainer
