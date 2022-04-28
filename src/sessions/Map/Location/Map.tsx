import React, {FC} from "react";
import {MapInitialState} from "../../../redux/reducers/map-reducer";
import LocationContainer from "./LocationContainer";
import styles from "./Map.module.css";

type PropsType = {
    map: MapInitialState,
}

const Map: FC<PropsType> = ({map}) => {

    return (
        <div>
            {
                map.locations.length
                    ? <section className={styles.mapContainer}>

                        <article className={styles.mapFirstLayer}>
                            <div className={styles.mapFirstItem}>
                                <LocationContainer location={map.locations[0]}/>
                            </div>
                            <div className={styles.mapSecondItem}>
                                <LocationContainer location={map.locations[1]}/>
                            </div>
                            <div className={styles.mapThirdItem}>
                                <LocationContainer location={map.locations[2]}/>
                            </div>
                            <div className={styles.mapFourthItem}>
                                <LocationContainer location={map.locations[3]}/>
                            </div>
                        </article>
                        <article className={styles.mapSecondLayer}>
                            <div className={styles.mapFirstItem}>
                                <LocationContainer location={map.locations[4]}/>
                            </div>
                            <div className={styles.mapSecondItem}>
                                <LocationContainer location={map.locations[5]}/>
                            </div>
                            <div className={styles.mapThirdItem}>
                                <LocationContainer location={map.locations[6]}/>
                            </div>
                        </article>
                        <article className={styles.mapThirdLayer}>
                            <div className={styles.mapFirstItem}>
                                <LocationContainer location={map.locations[7]}/>
                            </div>
                            <div className={styles.mapSecondItem}>
                                <LocationContainer location={map.locations[8]}/>
                            </div>
                        </article>
                        <article className={styles.mapFourthLayer}>
                            <div className={styles.mapFirstItem}>
                                <LocationContainer location={map.locations[9]}/>
                            </div>
                        </article>
                    </section>
                    : <div>Нет данных</div>
            }

        </div>
    )
}

export default Map
