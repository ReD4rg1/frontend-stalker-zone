import {useEffect, useState} from "react";
import {Character, connect, disconnect, sendChar} from "../../api/WebSocket/WebSocket";
import styles from "./MenuContainer.module.css";

const MenuContainer = () => {

    const [characters, setCharacters] = useState<Character[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        connect({setCharacters, setConnected})
        return () => disconnect()
    }, [])

    useEffect(() => {
        if (connected) {
            sendChar(0)
        }
    }, [connected])

    return (
        <div>
            <section>
                {characters.length > 0
                    ? characters.map((char) => (
                        <div key={char.id} className={styles.char}>
                            <div>
                                <h3>{char.name}</h3>
                            </div>
                            <div style={{color: `${char.available ? "white" : "red"}`}}>
                                {char.available ? "Доступный" : "Недоступный"}
                            </div>
                            <div>
                                <button onClick={() => sendChar(char.id)}>Смена статуса</button>
                            </div>
                        </div>
                        )
                    )
                    : <div />
                }
            </section>
        </div>
    )
}

export default MenuContainer
