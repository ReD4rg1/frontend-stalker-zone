import {useEffect, useState} from "react";
import {
    bindUser,
    connect,
    disconnect,
    getChars,
    getUsersInRoom,
    toggleReadyStatus
} from "../../../api/Rooms/WebSocket/WebSocket";
import {Character, RoomInitialState, User} from "../../../redux/reducers/room-reducer";
import CharacterComponent from "./CharacterComponent";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import {PlayersInitialState} from "../../../redux/reducers/players-reducer";
import UserComponent from "./UserComponent";
import styles from "./index.module.css";
import CharInfo from "./CharInfo";
import {CheckStartGame} from "../../../redux/logic/startGame/startGame";

interface ExitRoomProps {
    getChars: (id: number) => void
    bindUser: (characterId: number, userId: number | null) => void
    getUsersInRoom: (id: number) => void
}

interface Props {
    auth: AuthInitialState
    players: PlayersInitialState
    rooms: RoomInitialState
    SetCharacters: (payload: Character[]) => void
    SetUsers: (payload: User[]) => void
    SetRoomUsers: (payload: string[]) => void
    ExitRoom: ({getChars, bindUser, getUsersInRoom}: ExitRoomProps) => void
    StartGame: () => void
}

const MenuContainer = ({auth, rooms, SetCharacters, SetUsers, SetRoomUsers, ExitRoom, StartGame}: Props) => {
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        connect({setConnected, SetCharacters, SetUsers, SetRoomUsers})
        return () => disconnect()
    }, [SetCharacters, SetUsers, SetRoomUsers])

    useEffect(() => {
        if (connected) {
            getChars(0)
            bindUser(0, 0)
            getUsersInRoom(0)
        }
    }, [connected])

    useEffect(() => {
        CheckStartGame({users: rooms.currentRoom.usersList, StartGame})
    }, [rooms.currentRoom.usersList])

    return (
        <div className={styles.mainContainer}>
            <section className={styles.mainContainerSection}>
                <h3>{"Персонажи"}</h3>
                {rooms.currentRoom.charactersList.map((char) =>
                    <CharacterComponent
                        char={char}
                        users={rooms.currentRoom.usersList}
                        key={char.id}
                        userId={auth.userId}
                        bindUser={bindUser}
                        getChars={getChars}
                    />
                )}
            </section>
            <section className={styles.mainContainerPlayersSection}>
                <h3>{"Меню игроков"}</h3>
                <section className={styles.mainContainerInfoSection}>
                    <div className={styles.subSection}>
                        {rooms.currentRoom.usersList.map((user) =>
                            <UserComponent
                                chars={rooms.currentRoom.charactersList}
                                userId={auth.userId}
                                user={user}
                                key={user.userId}
                                bindUser={bindUser}
                                getChars={getChars}
                                toggleReadyStatus={toggleReadyStatus}
                            />
                        )}
                    </div>
                    <div className={styles.infoSection}>
                        <CharInfo
                            chars={rooms.currentRoom.charactersList}
                            users={rooms.currentRoom.usersList}
                            userId={auth.userId}
                        />
                    </div>
                </section>
            </section>
            <section className={styles.usersSection}>
                <div className={styles.usersSectionContainer}>
                    <h3>{"Игроки в сессии"}</h3>
                    {rooms.currentRoom.usersInRoom.map((user, index) => (
                        <div key={`${user}` + index}>
                            {user.username}
                        </div>
                    ))}
                </div>
                <div>
                    <button className={styles.exitButton} onClick={() => {
                        ExitRoom({getChars, bindUser, getUsersInRoom})
                    }}>
                        {"Выйти из сессии"}
                    </button>
                </div>
            </section>
        </div>
    )
}

export default MenuContainer
