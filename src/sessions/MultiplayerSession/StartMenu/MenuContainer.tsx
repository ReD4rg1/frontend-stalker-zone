import {useEffect, useState} from "react";
import {Character, connect, disconnect, sendChar} from "../../../api/WebSocket/WebSocket";
import CharacterMenuItem from "./CharacterMenuItem";

const MenuContainer = () => {

    const [characters, setCharacters] = useState<Character[]>([])
    const [connected, setConnected] = useState(false)

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
                {characters.map((char) =>
                    <CharacterMenuItem char={char} key={char.id}/>
                )}
            </section>
        </div>
    )
}

export default MenuContainer
