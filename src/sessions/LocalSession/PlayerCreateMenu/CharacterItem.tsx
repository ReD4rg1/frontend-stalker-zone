import {Draggable} from "react-beautiful-dnd";
import React from "react";
import styles from "./PlayerCreateMenu.module.css";

interface IProps {
    playerItem: {
        id: number
        name: string
    }
    index: number
}

const CharacterItem = ({playerItem, index}: IProps) => {
    return (
        <Draggable draggableId={playerItem.id.toString()} index={index} key={index}>
            {(provided) => (
                <div
                    className={styles.characterItem}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={playerItem.id}
                >
                    {playerItem.name}
                </div>
            )}
        </Draggable>
    )
}

export default CharacterItem