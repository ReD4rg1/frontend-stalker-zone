import {Character, User} from "../../../redux/reducers/room-reducer";
import styles from "./index.module.css";

interface Props {
    chars: Character[]
    users: User[]
    userId: number | null
}

let initialChar: Character = {
    id: 0,
    name: "initial",
    available: false,
    effectsList: []
}

const CharInfo = ({chars, users, userId}: Props) => {
    let currentCharId: number
    users.forEach((user) => {
        if (user.userId === userId) currentCharId = user.characterId
    })

    let currentCharInfo: Character = initialChar
    chars.forEach((char) => {
        if (char.id === currentCharId) currentCharInfo = char
    })

    return (
        <div>
            <section className={styles.effectsContainer}>
                <h3>{"Кличка игрока"}</h3>
                <h3>{currentCharInfo.name}</h3>
            </section>
            <section>
                {currentCharInfo.effectsList.map((effect) => (
                    <div className={styles.effect} key={effect.id}>
                        <h4>{effect.name}</h4>
                        <h4>{effect.value}</h4>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default CharInfo