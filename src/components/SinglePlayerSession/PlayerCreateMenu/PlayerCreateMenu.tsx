import {IPlayer} from "../../../redux/players-reducer";
import {useState} from "react";
import styles from "./PlayerCreateMenu.module.css";
import backgroundImage from "../../../assets/img/main-menu/main-menu-background.jpg";


interface IProps {
    players: PlayersType
    createPlayers: (arr: Array<number>) => void
}

type PlayersType = {
    players: Array<IPlayer>
    initialPlayersInfo: Array<any>
}

const PlayerCreateMenu = (props: IProps) => {

    const [playersArray, setPlayersArray] = useState<Array<number>>([])

    const onDragStart = (e: any /*DragEvent<HTMLDivElement>*/) => {

        e.dataTransfer.setData('text/plain', e.target.id)
        e.currentTarget.style.backgroundColor="yellow"
        e.currentTarget.style.color="black"
    }

    const onDragEnd = (e: any /*DragEvent<HTMLDivElement>*/) => {

        e.dataTransfer.setData('text/plain', e.target.id)
        e.currentTarget.style.backgroundColor="rgba(14, 72, 59, 0.63)"
        e.currentTarget.style.color="white"
    }

    const onDragOver = (e: any) => {

        e.preventDefault()
    }

    const onDrop = (e: any) => {

        const id = e
            .dataTransfer
            .getData('text')

        setPlayersArray([...playersArray, parseInt(id.split('-')[1])+1])

        const draggableElement = document.getElementById(id)
        const dropZone = e.target
        dropZone.appendChild(draggableElement)

        e.dataTransfer.clearData()
    }

    const playerItems = props.players.initialPlayersInfo.map((item, i) => {

        return (
            <div id={`draggable-${i}`}
                 key={i}
                 className={styles.exampleDraggable}
                 draggable={true}
                 onDragStart={(e) => onDragStart(e)}
                 onDragEnd={(e) => onDragEnd(e)}>
                {item.playerName}
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <div>Players</div>
            <section className={styles.backgroundImageContainer}>
                <img src={backgroundImage} alt={"#"}/>
            </section>
            <section className={styles.dropMenuContainer}>
                <div className={styles.exampleParent}>
                    <div className={styles.exampleDropzone}
                         //onDragOver={(e) => onDragOver(e)}
                         /*onDrop={(e) => onDrop(e)}*/>
                        Expects
                        {playerItems}
                    </div>
                    <div className={styles.exampleDropzone}
                         onDragOver={(e) => onDragOver(e)}
                         onDrop={(e) => onDrop(e)}>
                        Done
                    </div>
                </div>
                <button disabled={playersArray.length >= 2} onClick={() => {
                    if (playersArray.length >= 2) props.createPlayers(playersArray)
                }}>CreatePlayers</button>
            </section>
        </div>
    )
}

export default PlayerCreateMenu