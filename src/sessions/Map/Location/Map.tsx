import React, {FC} from "react";
import {MapInitialState} from "../../../redux/reducers/map-reducer";
import LocationContainer from "./LocationContainer";
import styles from "./Map.module.css";
import {Player} from "../../../redux/reducers/players-reducer";

interface Props {
    map: MapInitialState
    players: Player[]

}

const Map: FC<Props> = ({map, players}) => {

    return (
        <main className={styles.mainContainer}>
            {map.locations.length
                ? <section className={styles.mapContainer}>

                    <article className={styles.mapFirstLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[0]} players={players} />
                        </div>
                        <div className={styles.mapSecondItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[1]} players={players} />
                        </div>
                        <div className={styles.mapThirdItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[2]} players={players} />
                        </div>
                        <div className={styles.mapFourthItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[3]} players={players} />
                        </div>
                    </article>
                    <article className={styles.mapSecondLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[4]} players={players} />
                        </div>
                        <div className={styles.mapSecondItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[5]} players={players} />
                        </div>
                        <div className={styles.mapThirdItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[6]} players={players} />
                        </div>
                    </article>
                    <article className={styles.mapThirdLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[7]} players={players} />
                        </div>
                        <div className={styles.mapSecondItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[8]} players={players} />
                        </div>
                    </article>
                    <article className={styles.mapFourthLayer}>
                        <div className={styles.mapFirstItem}>
                            <LocationContainer availableHexes={map.availableHexes} location={map.locations[9]} players={players} />
                        </div>
                    </article>
                </section>
                : <div>Нет данных</div>
            }
        </main>
    )
}

export default Map
