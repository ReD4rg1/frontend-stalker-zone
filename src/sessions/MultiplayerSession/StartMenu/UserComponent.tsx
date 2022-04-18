import styles from "./index.module.css";
import {toggleReadyStatus} from "../../../api/Rooms/WebSocket/WebSocket";
import {User} from "../../../redux/reducers/room-reducer";

interface Props {
    user: User
}

const UserComponent = ({user}: Props) => {
    return (
        <div className={styles.char}>
            <div>
                <h3>{user.username}</h3>
            </div>
            <div style={{color: `${user.readyStatus ? "green" : "red"}`}}>
                {user.readyStatus ? "Готов" : "Не готов"}
            </div>
            <div>
                <button onClick={() => toggleReadyStatus(user.userId, !user.readyStatus)}>
                    {user.readyStatus ? "Отменить готовность" : "Готов"}
                </button>
            </div>
        </div>
    )
}

export default UserComponent
