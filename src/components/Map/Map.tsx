import React, {FC} from "react";
import {IInitialState} from "../../redux/map-reducer";
import Location from "./Location";
import styles from "./Map.module.css";

type PropsType = {
    map: IInitialState,
    generateMap: () => void,
}

const Map: FC<PropsType> = ({map, generateMap}) => {

    let lastLocation = map.locations[map.locations.length - 1]

    const mapItemsArray = map.locations.map((item, i) => {
        const hexesArray = item.allLocations.map(item => {
            return item
        })
        return {'hexesArray': hexesArray, 'locationID': item.locationID}
    })


    return (
        <div>
            <section>
                <p>Generate location</p>
                <p>{'Last Location: ' + lastLocation.locationID}</p>
                <button onClick={() => generateMap()}>Generate Map</button>
            </section>
            {
                mapItemsArray.length === 10
                    ? <section className={styles.mapContainer}>

                        <article className={styles.mapFirstLayer}>
                            <div className={styles.mapFirstItem}>
                                <Location data={mapItemsArray[0]}/>
                            </div>
                            <div className={styles.mapSecondItem}>
                                <Location data={mapItemsArray[1]}/>
                            </div>
                            <div className={styles.mapThirdItem}>
                                <Location data={mapItemsArray[2]}/>
                            </div>
                            <div className={styles.mapFourthItem}>
                                <Location data={mapItemsArray[3]}/>
                            </div>
                        </article>
                        <article className={styles.mapSecondLayer}>
                            <div className={styles.mapFirstItem}>
                                <Location data={mapItemsArray[4]}/>
                            </div>
                            <div className={styles.mapSecondItem}>
                                <Location data={mapItemsArray[5]}/>
                            </div>
                            <div className={styles.mapThirdItem}>
                                <Location data={mapItemsArray[6]}/>
                            </div>
                        </article>
                        <article className={styles.mapThirdLayer}>
                            <div className={styles.mapFirstItem}>
                                <Location data={mapItemsArray[7]}/>
                            </div>
                            <div className={styles.mapSecondItem}>
                                <Location data={mapItemsArray[8]}/>
                            </div>
                        </article>
                        <article className={styles.mapFourthLayer}>
                            <div className={styles.mapFirstItem}>
                                <Location data={mapItemsArray[9]}/>
                            </div>
                        </article>
                    </section>
                    : <div className={styles.mapFirstItem}>
                        <Location data={mapItemsArray[0]}/>
                    </div>
            }

        </div>
    )
}

export default Map