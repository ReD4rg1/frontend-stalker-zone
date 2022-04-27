import styles from "./index.module.css";
import { Character, User } from "../../../redux/reducers/room-reducer";

interface Props {
    char: Character
    users: User[]
    userId: number | null
    bindUser: (characterId: number, userId: number | null) => void
    getChars: (id: number) => void
}

const findUserById = (users: User[], userId: number | null) => {
    let me: User | undefined
    users.forEach((user) => {
        if (userId === user.userId) me = user
    })
    return me
}

const CharacterComponent = ({char, users, userId, getChars, bindUser}: Props) => {
    const me = findUserById(users, userId)

    return (
        <div className={styles.char}>
            <div>
                <h3>{char.name}</h3>
            </div>
            <div style={{color: `${char.available ? "green" : "red"}`}}>
                {char.available ? "Доступный" : "Недоступный"}
            </div>
            <div style={{display: `${me && me.characterId !== char.id ? "none" : "block"}`}}>
                {me && me.characterId === char.id
                    ? <button disabled={me.readyStatus} onClick={() => {
                        getChars(me ? me.characterId : 0)
                        bindUser(me ? me.characterId: 0, me ? me.userId : 0)
                    }}>
                        {"Отменить выбор"}
                    </button>
                    : <button disabled={!char.available} onClick={() => {
                        getChars(char.id)
                        bindUser(char.id, userId)
                    }}>
                        {"Выбрать героя"}
                    </button>
                }
            </div>
        </div>
    )
}

export default CharacterComponent
