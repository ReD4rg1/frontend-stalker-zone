import styles from "./Medkits.module.css";
import medkit1 from "../../../../../assets/img/items/medkits/medkit-1.png"
import medkit2 from "../../../../../assets/img/items/medkits/medkit-2.png"
import medkit3 from "../../../../../assets/img/items/medkits/medkit-3.png"
import stim1 from "../../../../../assets/img/items/stims/stim-1.png"
import stim2 from "../../../../../assets/img/items/stims/stim-2.png"
import stim3 from "../../../../../assets/img/items/stims/stim-3.png"
import {Player} from "../../../../../redux/reducers/players-reducer";

interface Props {
    medkitsPosition: number
    stimsPosition: number
    setMedkitsPosition: (position: number) => void
    setStimsPosition: (position: number) => void
    myPlayer: Player
    medkitUse: (playerId: number, medkitId: number) => void
    stimulatorUse: (playerId: number, stimulatorId: number) => void
}

const Medkits = ({
    myPlayer,
    medkitsPosition,
    stimsPosition,
    setMedkitsPosition,
    setStimsPosition,
    medkitUse,
    stimulatorUse,
}:Props) => {

    let medkitImages = {
        "Лист подорожника": medkit1,
        "Бинты": medkit2,
        "Нанопластырь": medkit3,
    }
    let stimImages = {
        "Самогон": stim1,
        "Стероиды": stim2,
        "Дзета-элексир": stim3,
    }

    let imgMed = medkitImages[myPlayer.inventory.medkits[medkitsPosition] ? myPlayer.inventory.medkits[medkitsPosition].name : "Лист подорожника"]
    let imgStim = stimImages[myPlayer.inventory.stimulants[stimsPosition] ? myPlayer.inventory.stimulants[stimsPosition].name : "Самогон"]

    const changeMedkitPosition = (position: number) => {
        if ((medkitsPosition + position) < 0) setMedkitsPosition(myPlayer.inventory.medkits.length-1)
        else if ((medkitsPosition + position) >= myPlayer.inventory.medkits.length) setMedkitsPosition(0)
        else setMedkitsPosition(medkitsPosition + position)
    }

    const changeStimPosition = (position: number) => {
        if ((stimsPosition + position) < 0) setStimsPosition(myPlayer.inventory.stimulants.length-1)
        else if ((stimsPosition + position) >= myPlayer.inventory.stimulants.length) setStimsPosition(0)
        else setStimsPosition(stimsPosition + position)
    }

    return (
        <div>
            {myPlayer.inventory.medkits[medkitsPosition]
                ? <div className={styles.medkitsContainer}>
                    <div onClick={() => medkitUse(myPlayer.id, myPlayer.inventory.medkits[medkitsPosition].id)} className={styles.medkitsImgContainer}>
                        <img src={imgMed} alt={""}/>
                    </div>
                    <div className={styles.medkitsInfoBlock}>
                        {myPlayer.inventory.medkits[medkitsPosition].name}
                    </div>
                    <button onClick={() => changeMedkitPosition(1)} className={styles.rightButton}>{">"}</button>
                    <button onClick={() => changeMedkitPosition(-1)} className={styles.leftButton}>{"<"}</button>
                </div>
                : <div/>
            }
            {myPlayer.inventory.stimulants[stimsPosition]
                ? <div className={styles.stimsContainer}>
                    <div onClick={() => stimulatorUse(myPlayer.id, myPlayer.inventory.stimulants[stimsPosition].id)} className={styles.stimsImgContainer}>
                        <img src={imgStim} alt={""}/>
                    </div>
                    <div className={styles.stimsInfoBlock}>
                        {myPlayer.inventory.stimulants[stimsPosition].name}
                    </div>
                    <button onClick={() => changeStimPosition(1)} className={styles.rightButton}>{">"}</button>
                    <button onClick={() => changeStimPosition(-1)} className={styles.leftButton}>{"<"}</button>
                </div>
                : <div/>
            }
        </div>
    )
}

export default Medkits
