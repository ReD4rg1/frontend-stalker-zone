import styles from "./index.module.css";
import {RoomListType} from "../../../api/roomAPI";
import {MaxPlayersCountInSession} from "../../../consts/multiplayerSession";
import Button from "../../../components/common/ReloadButton/Button";
import React from "react";

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
