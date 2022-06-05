import styles from "./Event.module.css";
import {EventsType, Player, PlayersInitialState} from "../../../redux/reducers/players-reducer";
import EventButtons from "./EventButtons";
import angleEvent from "../../../redux/logic/angleEvent";

interface Props {
    players: PlayersInitialState
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void
    passMove: (eventType: EventsType) => void
    eventRoll: (playerId: number) => void
}

const Event = ({players, applyEvent, passMove, eventRoll}:Props) => {

    const inEvent = (player: Player) => {
        return player.states.inEvent
    }

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
            <section>
                {"Угол между локациями: " + angleEvent({playerCoords: players.myPlayer.coordinates, finishCoords: {hexId: players.currentEvent.hexId, locationId: players.currentEvent.locationId}})}
            </section>
            <section>
                <EventButtons
                    myPlayer={players.myPlayer}
                    applyEvent={applyEvent}
                    passMove={passMove}
                    eventRoll={eventRoll}
                    event={players.currentEvent}
                />
            </section>
        </div>
    )

    return null
}

export default Event
