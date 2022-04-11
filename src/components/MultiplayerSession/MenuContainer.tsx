import {useEffect, useState} from "react";
import {connect, disconnect, sendChar} from "../../api/WebSocket/WebSocket";

const MenuContainer = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        connect()
        return () => disconnect()
    }, [])

    return (
        <div>
            <button onClick={() => sendChar({id: 0})}>
                Получить
            </button>
            <button onClick={() => sendChar({id: 1})}>
                Поменять
            </button>
        </div>
    )
}

export default MenuContainer