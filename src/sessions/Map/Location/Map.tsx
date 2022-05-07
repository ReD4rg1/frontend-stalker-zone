import React, {FC} from "react";
import {MapInitialState} from "../../../redux/reducers/map-reducer";
import LocationContainer from "./LocationContainer";
import styles from "./Map.module.css";
import {Player} from "../../../redux/reducers/players-reducer";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";

interface Props {
    map: MapInitialState
    auth: AuthInitialState
    players: Player[]
    moveTo: (locationId: number, hexId: number, difficulty: number, playerId: number) => void
}

const Map: FC<Props> = ({map, players, moveTo, auth}) => {

    let myPlayer: Player = players[0]
    players.forEach((player) => {
        if (auth.userId === player.userId) myPlayer = player
    })

    return (
        <main className={styles.mainContainer}>
            {map.locations.length
                ? <section className={styles.mapContainer}>

                    <article className={styles.mapFirstLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[0]}
                                players={players}
                            />
                        </div>
                        <div className={styles.mapSecondItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[1]}
                                players={players}
                            />
                        </div>
                        <div className={styles.mapThirdItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[2]}
                                players={players}
                            />
                        </div>
                        <div className={styles.mapFourthItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[3]}
                                players={players}
                            />
                        </div>
                    </article>
                    <article className={styles.mapSecondLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[4]}
                                players={players}
                            />
                        </div>
                        <div className={styles.mapSecondItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[5]}
                                players={players}
                            />
                        </div>
                        <div className={styles.mapThirdItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[6]}
                                players={players}
                            />
                        </div>
                    </article>
                    <article className={styles.mapThirdLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[7]}
                                players={players}
                            />
                        </div>
                        <div className={styles.mapSecondItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[8]}
                                players={players}
                            />
                        </div>
                    </article>
                    <article className={styles.mapFourthLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer
                                myPlayer={myPlayer}
                                moveTo={moveTo}
                                availableHexes={map.availableHexes}
                                location={map.locations[9]}
                                players={players}
                            />
                        </div>
                    </article>
                </section>
                : <div>Нет данных</div>
            }
        </main>
    )
}

export default Map
