import styles from "./Event.module.css";
import {EventsType, Player, PlayersInitialState} from "../../../redux/reducers/players-reducer";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";

interface Props {
    players: PlayersInitialState
    auth: AuthInitialState
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void
    passMove: (eventType: EventsType) => void
}

const Event = ({players, auth, applyEvent, passMove}:Props) => {

    const inEvent = (player: Player) => {
        return player.states.inEvent
    }

    let myPlayer: Player = players.players[0]
    players.players.forEach((player) => {
        if (auth.userId === player.userId) myPlayer = player
    })

    if (players.players.some(inEvent)) return (
        <div className={styles.container}>
            <section className={styles.title}>
                {players.currentEvent.title}
            </section>
            <section className={styles.text}>
                {players.currentEvent.text}
            </section>
            <section className={styles.description}>
                {players.currentEvent.description}
            </section>

            {myPlayer.states.inEvent
                ? <section>
                    <button onClick={() => applyEvent(
                        myPlayer.id,
                        players.currentEvent.id,
                        players.currentEvent.type
                    )}>
                        {"Проиграть событие"}
                    </button>
                    <button onClick={() => passMove(players.currentEvent.type)}>
                        {"Завершить событие"}
                    </button>
                </section>
                : <div/>
            }
        </div>
    )

    return null
}

export default Event
