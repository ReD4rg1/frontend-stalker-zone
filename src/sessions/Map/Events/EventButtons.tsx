import {CurrentEvent, EventsType, Player} from "../../../redux/reducers/players-reducer";
import makeRoll from "../../../assets/img/buttonIcons/diceRoll.png"

interface Props {
    myPlayer: Player
    applyEvent: (playerId: number, eventId: number, type: EventsType) => void
    passMove: (eventType: EventsType) => void
    eventRoll: (playerId: number) => void
    event: CurrentEvent
    startFight: (level: number, playerId: number, eventId: number) => void
}

const EventButtons = ({myPlayer, applyEvent, eventRoll, passMove, event, startFight}: Props) => {

    if (!myPlayer.states.inEvent) return null

    if (event.type === "simpleCard") return (
        <div>
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
        </div>
    )

    if (event.type === "throwCard") return (
        <div>
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
                        <img
                            onClick={() => eventRoll(
                                myPlayer.id
                            )}
                            src={makeRoll}
                            alt={"Сделать бросок"}
                        />
                    )
            }
        </div>
    )

    if (event.type === "moveCard") return (
        <div>
            {myPlayer.states.eventComplete && (myPlayer.numberOfMoves === 0 || ((event.locationId === myPlayer.coordinates.locationId) && (event.hexId === myPlayer.coordinates.hexId)))
                ? (
                    <button onClick={() => passMove(event.type)}>
                        {"Завершить событие"}
                    </button>
                )
                : event.possibilitySkip
                    ? myPlayer.states.eventComplete
                        ? (<div>{"Завершите ходы"}</div>)
                        : (<div>
                                <button onClick={() => applyEvent(
                                    myPlayer.id,
                                    event.id,
                                    event.type
                                )}>
                                    {"Принять"}
                                </button>
                                <button onClick={() => passMove(event.type)}>
                                    {"Завершить событие"}
                                </button>
                            </div>


                        )
                    : myPlayer.states.eventComplete
                        ? (<div>{"Завершите ходы"}</div>)
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
        </div>
    )
    if (event.type === "monsterCard") return (
        <div>
            {myPlayer.states.eventComplete && !myPlayer.states.inFight
                ? (
                    <button onClick={() => passMove(event.type)}>
                        {"Завершить событие"}
                    </button>
                )
                : (myPlayer.states.inFight
                        ? <div>{"Завершите бой"}</div>
                        : <button onClick={() => startFight(
                            event.monsterLevel,
                            myPlayer.id,
                            event.id,
                        )}>
                            {"Принять бой"}
                        </button>
                )
            }
        </div>
    )

    return <div/>
}

export default EventButtons
