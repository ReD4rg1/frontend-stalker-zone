import styles from "./MenuContainer.module.css";
import {bindUser} from "../../../api/Rooms/WebSocket/WebSocket";
import { Character } from "../../../redux/reducers/room-reducer";

interface Props {
    char: Character
    userId: number | null
}

const CharacterComponent = ({char, userId}: Props) => {
    return (
        <div className={styles.char}>
            <div>
                <h3>{char.name}</h3>
            </div>
            <div style={{color: `${char.available ? "green" : "red"}`}}>
                {char.available ? "Доступный" : "Недоступный"}
            </div>
            <div>
                <button onClick={() => bindUser(char.id, userId)}>Выбрать героя</button>
            </div>
        </div>
    )
}

export default CharacterComponent
