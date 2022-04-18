import {RoomListType} from "../../../api/Rooms/roomAPI";
import {MaxPlayersCountInSession} from "../../../consts/multiplayerSession";
import Button from "../../../components/common/ReloadButton/Button";
import React from "react";
import styles from "./index.module.css";

interface Props {
    room: RoomListType
    joinToRoom: () => void
}

const Room = ({room, joinToRoom}: Props) => {
    return (
        <div className={styles.roomContainer}>
            <section>
                <div>{room.name}</div>
            </section>
            <section>
                <div>{room.numberOfUsers + "/" + MaxPlayersCountInSession}</div>
            </section>
            <section>
                <Button onClick={() => joinToRoom()} type="invert" text="Присоединиться" />
            </section>
        </div>
    )
}

export default Room
