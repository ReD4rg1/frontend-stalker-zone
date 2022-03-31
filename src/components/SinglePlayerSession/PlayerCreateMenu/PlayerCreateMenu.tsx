import {IInitialPlayerInfo, IPlayer} from "../../../redux/players-reducer";
import {useState} from "react";
import styles from "./PlayerCreateMenu.module.css";
import backgroundImage from "../../../assets/img/main-menu/main-menu-background.jpg";


interface IProps {
    players: PlayersType
    createPlayers: (arr: Array<number>) => void
}

type PlayersType = {
    players: Array<IPlayer>
    initialPlayersInfo: Array<IInitialPlayerInfo>
}

const ColumnItem = (props: any) => {

    return (
        <div/>
    )
}

interface IInitialData {
    players: Array<any>
    columns: {
        'column-1': {}
    }
    columnOrder: Array<any>
}

const PlayerCreateMenu = (props: IProps) => {

    const [playersFinalArray, setPlayersFinalArray] = useState<Array<number>>([])

    const initialData: IInitialData = {
        players: [
            ...props.players.initialPlayersInfo.map((item, i) => {
                return {
                    id: item.playerId,
                    name: item.playerName,
                }
            })
        ],
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Выберите игрока',
                playersIds: [...props.players.initialPlayersInfo.map(item => {
                    return item.playerId
                })]
            }
        },
        columnOrder: ['column-1']
    }

    console.log('initialData: ', initialData)

    return (
        <div className={styles.container}>
            <div>Players</div>
            <section className={styles.backgroundImageContainer}>
                <img src={backgroundImage} alt={"#"}/>
            </section>
            <section className={styles.dropMenuContainer}>
                {initialData.columnOrder.map((columnId: string) => {
                    // @ts-ignore
                    const column = initialData.columns[columnId]
                    console.log('column.playersIds: ', column.playersIds)
                    const players = column.playersIds.map((playerId: number) => initialData.players[playerId])

                    return <ColumnItem key={column.id} column={column} players={players}/>
                })}
                <button disabled={playersFinalArray.length < 2} onClick={() => {
                    if (playersFinalArray.length >= 2) props.createPlayers(playersFinalArray)
                }}>CreatePlayers
                </button>
            </section>
        </div>
    )
}

export default PlayerCreateMenu
