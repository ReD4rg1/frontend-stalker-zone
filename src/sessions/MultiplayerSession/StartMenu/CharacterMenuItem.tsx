import styles from "./MenuContainer.module.css";
import {sendChar} from "../../../api/WebSocket/WebSocket";
import { Character } from "../../../redux/reducers/room-reducer";

interface Props {
    char: Character
}

const CharacterMenuItem = ({char}: Props) => {
    return (
        <div className={styles.char}>
            <div>
                <h3>{char.name}</h3>
            </div>
            <div style={{color: `${char.available ? "green" : "red"}`}}>
                {char.available ? "Доступный" : "Недоступный"}
            </div>
            <div>
                <button onClick={() => sendChar(char.id)}>Смена статуса</button>
            </div>
        </div>
    )
}

export default CharacterMenuItem
