import {CurrentEvent, EventsType, Player} from "../../../redux/reducers/players-reducer";

interface Props {
    myPlayer: Player
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void
    passMove: (eventType: EventsType) => void
    eventRoll: (playerId: number) => void
    event: CurrentEvent
}

const EventButtons = ({myPlayer, applyEvent, eventRoll, passMove, event}: Props) => {

    if (!myPlayer.states.inEvent) return null

    if (event.type === "simpleCard") return (
        <section>
            {myPlayer.states.eventComplete
                ? (
                    <button onClick={() => passMove(event.type)}>
                        {"Завершить событие"}
                    </button>
                )
                : (
                    <button onClick={() => applyEvent(
                        myPlayer.id,
                        event.id,
                        event.type
                    )}>
                        {"Принять"}
                    </button>
                )
            }
        </section>
    )

    if (event.type === "throwCard") return (
        <section>
            {myPlayer.states.eventComplete
                ? (
                    <button onClick={() => passMove(event.type)}>
                        {"Завершить событие"}
                    </button>
                )
                : myPlayer.states.alreadyThrowCube
                    ? (
                        <div>
                            <div>
                                {`Результат броска: ${event.rollCube}`}
                            </div>
                            <button onClick={() => applyEvent(
                                myPlayer.id,
                                event.id,
                                event.type
                            )}>
                                {`Принять`}
                            </button>
                        </div>
                    )
                    : (
                        <button onClick={() => eventRoll(
                            myPlayer.id
                        )}>
                            {"Бросить кубик"}
                        </button>
                    )
            }
        </section>
    )

    if (event.type === "moveCard") return (
        <section>
            {!myPlayer.states.eventComplete
                ? (
                    <button onClick={() => passMove(event.type)}>
                        {"Завершить событие"}
                    </button>
                )
                : (
                    <button onClick={() => applyEvent(
                        myPlayer.id,
                        event.id,
                        event.type
                    )}>
                        {"Принять"}
                    </button>
                )
            }
        </section>
    )

    return <div />
}

export default EventButtons
