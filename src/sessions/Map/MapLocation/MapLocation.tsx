import styles from "./MapLocation.module.css";
import {Player} from "../../../redux/reducers/players-reducer";
import background from "../../../assets/img/interface/location.png";

interface Props {
    myPlayer: Player
    showLocation: boolean
    toggleLocation: () => void
    makeRoll: (playerId: number) => void
    locationMove: (playerId: number, level: number, position: number) => void
    startFight: (level: number, playerId: number, eventId: number) => void
    locationOut: (playerId: number, getArtifact: boolean) => void
    locationPassMove: () => void
}

const MapLocation = ({myPlayer, toggleLocation, showLocation, locationMove, locationOut, makeRoll, locationPassMove, startFight}:Props) => {

    let locationSectors = []
    for (let i = 1; i <= myPlayer.locationCoordinate.position; i++) {
        locationSectors.push(
            <div style={{backgroundColor: `rgba(${i < 4 ? 140 + i * 40 : 255}, ${i > 4 ? 255 - i * 30 : 255},0,0.5)`}} key={i+myPlayer.locationCoordinate.id} className={styles.locationSectorItem}/>
        )
    }

    if (myPlayer.states.inLocation && showLocation) {
        return (
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={background} alt={""}/>
                </div>
                <section className={styles.mainSection}>
                    <div className={styles.locationInfo}>
                        <div className={styles.locationInfoItem}>
                            <div>{"Название локации: "}</div>
                            <div>{myPlayer.coordinates.locationName}</div>
                        </div>
                        <div className={styles.locationInfoItem}>
                            <div>{"Уровень локации: "}</div>
                            <div>{myPlayer.coordinates.locationLevel}</div>
                        </div>
                    </div>
                    {myPlayer.states.move
                        ? <div className={styles.locationButton}>
                            {myPlayer.locationCoordinate.position < 8
                                ? ((myPlayer.states.rollCube)
                                        ? <button onClick={() => makeRoll(myPlayer.id)}>{"Кинуть кубик"}</button>
                                        : (myPlayer.states.alreadyMove && !myPlayer.states.inFight
                                                ? <button onClick={() => locationPassMove()}>{"Передать ход"}</button>
                                                : <button onClick={() => locationMove(myPlayer.id, myPlayer.coordinates.locationLevel, myPlayer.numberOfMoves)}>{"Сделать ход"}</button>
                                        )
                                )
                                : <button onClick={() => locationOut(myPlayer.id, ((myPlayer.order?.firstPlace === myPlayer.coordinates.locationName) || (myPlayer.order?.secondPlace === myPlayer.coordinates.locationName)))}>{"Выйти из локации"}</button>
                            }
                        </div>
                        : null
                    }
                    <div className={styles.locationSector}>
                        {locationSectors}
                    </div>
                </section>
                <div className={styles.closeButton} onClick={() => toggleLocation()}>
                    {"Свернуть"}
                </div>
            </div>
        )
    }

    if (myPlayer.states.inLocation) return (
        <div className={styles.locationShowButton} onClick={() => toggleLocation()}>
            {"Локация"}
        </div>
    )

    return null
}

export default MapLocation
