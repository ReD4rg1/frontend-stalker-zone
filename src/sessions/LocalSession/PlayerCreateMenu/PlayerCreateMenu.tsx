import {IInitialPlayerInfo, Player} from "../../../redux/reducers/players-reducer";
import {useEffect, useState} from "react";
import styles from "./PlayerCreateMenu.module.css";
import backgroundImage from "../../../assets/img/main-menu/main-menu-background.jpg";
import {ColumnItem} from "./ColumnItem";
import {
    DragDropContext,
    DropResult
} from "react-beautiful-dnd";

interface IProps {
    players: PlayersType
    createPlayers: (arr: Array<number>) => void
}

type PlayersType = {
    players: Array<Player>
    initialPlayersInfo: Array<IInitialPlayerInfo>
}

interface IPlayers {
    id: number
    name: string
}

interface IInitialData {
    players: Array<IPlayers>
    columns: {
        [key: string]: {
            id: string
            title: string
            playersIds: Array<number>
        }
    }
    columnOrder: Array<string>
}

const PlayerCreateMenu = (props: IProps) => {

    const [playersFinalArray, setPlayersFinalArray] = useState<Array<number>>([])
    const [initialData, setInitialData] = useState<IInitialData>({
        players: [],
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Выберите игрока',
                playersIds: []
            },
            'column-2': {
                id: 'column-2',
                title: 'Активные игроки',
                playersIds: []
            }
        },
        columnOrder: ['column-1', 'column-2']
    })

    const onDragStart = () => {

    }
    const onDragUpdate = () => {

    }
    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = initialData.columns[source.droppableId]
        const finish = initialData.columns[destination.droppableId]

        if (start === finish) {
            const newPlayerIds = Array.from(start.playersIds)
            newPlayerIds.splice(source.index, 1)
            newPlayerIds.splice(destination.index, 0, parseInt(draggableId))

            const newColumn = {
                ...start,
                playersIds: newPlayerIds
            }

            setInitialData({
                ...initialData,
                columns: {
                    ...initialData.columns,
                    [newColumn.id]: newColumn
                }
            })

            return
        }

        const startPlayerIds = Array.from(start.playersIds)
        startPlayerIds.splice(source.index, 1)
        const newStart = {
            ...start,
            playersIds: startPlayerIds,
        }

        const finishPlayerIds = Array.from(finish.playersIds)
        finishPlayerIds.splice(destination.index, 0, parseInt(draggableId))
        const newFinish = {
            ...finish,
            playersIds: finishPlayerIds,
        }
        setInitialData({
            ...initialData,
            columns: {
                ...initialData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        })
        setPlayersFinalArray(newFinish.playersIds)
    }

    useEffect(() => {
        setInitialData(
            {
                ...initialData,
                players: [
                    ...props.players.initialPlayersInfo.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                        }
                    })
                ],
                columns: {
                    'column-1': {
                        ...initialData.columns['column-1'],
                        playersIds: [...props.players.initialPlayersInfo.map(item => item.id)]
                    },
                    'column-2': {
                        ...initialData.columns['column-2']
                    }
                }
            }
        )
    }, [props])

    return (
        <div className={styles.container}>
            <div>Players</div>
            <section className={styles.backgroundImageContainer}>
                <img src={backgroundImage} alt={"#"}/>
            </section>
            <section className={styles.dropMenuContainer}>

                <DragDropContext
                    onDragStart={() => onDragStart()}
                    onDragUpdate={() => onDragUpdate()}
                    onDragEnd={(result) => onDragEnd(result)}
                >
                    <div className={styles.dragDropContext}>
                        {initialData.columnOrder.map((columnId) => {
                            const column = initialData.columns[columnId]
                            const players: Array<IPlayers> =
                                column.playersIds.map((playerId) =>
                                    initialData.players[playerId-1])
                            return <ColumnItem key={column.id} column={column} players={players}/>
                        })}
                    </div>
                </DragDropContext>
                <button disabled={playersFinalArray.length < 2} onClick={() => {
                    if (playersFinalArray.length >= 2) props.createPlayers(playersFinalArray)
                }}>{"Начать игру"}
                </button>
            </section>
        </div>
    )
}

export default PlayerCreateMenu
