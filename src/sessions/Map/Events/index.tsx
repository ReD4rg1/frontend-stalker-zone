import styles from "./Event.module.css";
import {EventsType, Player, PlayersInitialState} from "../../../redux/reducers/players-reducer";
import EventButtons from "./EventButtons";
import background from "../../../assets/img/interface/event.png"
import '../../../fonts/Boycott.otf';

interface Props {
    players: PlayersInitialState
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void
    passMove: (eventType: EventsType) => void
    eventRoll: (playerId: number) => void
    showEvent: boolean
    toggleShowEvent: () => void
}

const Event = ({players, applyEvent, passMove, eventRoll, showEvent, toggleShowEvent}:Props) => {

    const inEvent = (player: Player) => {
        return player.states.inEvent
    }

    if (players.players.some(inEvent) && showEvent) return (
        <div className={styles.container}>
            <div className={styles.background}>
                <img src={background} alt={""}/>
            </div>
            <div className={styles.mainTitle}>
                {"С.О.Б.Ы.Т.И.Е"}
            </div>
            <section className={styles.title}>
                {players.currentEvent.title}
            </section>
            <section className={styles.text}>
                {players.currentEvent.text}
            </section>
            <section className={styles.description}>
                {players.currentEvent.description}
            </section>
            <div className={styles.buttonContainer}>
                <EventButtons
                    myPlayer={players.myPlayer}
                    applyEvent={applyEvent}
                    passMove={passMove}
                    eventRoll={eventRoll}
                    event={players.currentEvent}
                />
            </div>
            <div className={styles.closeButton} onClick={() => toggleShowEvent()}>
                {"Свернуть"}
            </div>
        </div>
    )

    if (players.players.some(inEvent)) return (
        <div className={styles.eventShowButton} onClick={() => toggleShowEvent()}>
            {"Событие"}
        </div>
    )

    return null
}

export default Event
