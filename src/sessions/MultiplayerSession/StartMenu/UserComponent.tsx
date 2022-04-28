import styles from "./index.module.css";
import {Character, User} from "../../../redux/reducers/room-reducer";

interface Props {
    userId: number | null
    user: User
    chars: Character[]
    toggleReadyStatus: (userId: number | null, readyStatus: boolean) => void
}

const UserComponent = ({userId, user, chars, toggleReadyStatus}: Props) => {
    return (
        <div className={styles.char}>
            <div>
                <h3>{user.username}</h3>
            </div>
            <div style={{color: `${user.readyStatus ? "green" : "red"}`}}>
                {user.readyStatus ? "Готов" : "Не готов"}
            </div>
            {userId === user.userId
                ? <div>
                    <button onClick={() => toggleReadyStatus(user.userId, !user.readyStatus)}>
                        {user.readyStatus ? "Отменить готовность" : "Готов"}
                    </button>
                </div>
                : <div>
                    {chars.map((char) => {
                        if (char.id === user.characterId) {
                            return (
                                <div key={char.id}>{char.name}</div>
                            )
                        } else return null
                    })}
                </div>
            }
        </div>
    )
}

export default UserComponent
