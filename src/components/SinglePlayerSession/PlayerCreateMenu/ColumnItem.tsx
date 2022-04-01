import {Droppable} from "react-beautiful-dnd";
import React from "react";
import CharacterItem from "./CharacterItem";
import styles from "./PlayerCreateMenu.module.css";

interface IPlayers {
    id: number
    name: string
}

interface IProps {
    column: {
        id: string
        title: string
        playersIds: Array<number>
    }
    players: Array<IPlayers | undefined>
}

export const ColumnItem = ({column, players}: IProps) => {

    return (
        <div className={styles.droppableContainer}>
            <section>
                <h2>{column.title}</h2>
            </section>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div className={styles.droppableZone}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        {players.map((playerItem, index) => {
                            if (playerItem !== undefined) {
                                return (
                                    <CharacterItem key={playerItem.id} index={index} playerItem={playerItem}/>
                                )
                            }

                            return null
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}