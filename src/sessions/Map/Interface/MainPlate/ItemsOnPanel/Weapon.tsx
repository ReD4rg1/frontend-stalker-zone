import styles from "./Wepon.module.css";
import weapon1 from "../../../../../assets/img/items/weapons/weapon-1.png"
import weapon2 from "../../../../../assets/img/items/weapons/weapon-2.png"
import weapon3 from "../../../../../assets/img/items/weapons/weapon-3.png"
import grenade1 from "../../../../../assets/img/items/grenades/grenade-1.png"
import grenade2 from "../../../../../assets/img/items/grenades/grenade-2.png"
import grenade3 from "../../../../../assets/img/items/grenades/grenade-3.png"
import grenade4 from "../../../../../assets/img/items/grenades/grenade-4.png"
import fist from "../../../../../assets/img/items/fist.png"
import {Player} from "../../../../../redux/reducers/players-reducer";
import medkit1 from "../../../../../assets/img/items/medkits/medkit-1.png";
import medkit2 from "../../../../../assets/img/items/medkits/medkit-2.png";
import medkit3 from "../../../../../assets/img/items/medkits/medkit-3.png";
import stim1 from "../../../../../assets/img/items/stims/stim-1.png";
import stim2 from "../../../../../assets/img/items/stims/stim-2.png";
import stim3 from "../../../../../assets/img/items/stims/stim-3.png";

interface Props {
    toggleWeapon: () => void
    isWeapon: boolean
    myPlayer: Player
    grenadesPosition: number
    setGrenadesPosition: (position: number) => void
}

const Weapon = ({isWeapon, toggleWeapon, myPlayer, grenadesPosition, setGrenadesPosition}:Props) => {

    let weaponImages = {
        "Берданка": weapon1,
        "АК-47": weapon2,
        "Квазар": weapon3,
    }
    let grenadeImages = {
        "Коктейль Молотова": grenade1,
        "Лимонка": grenade2,
        "Теща": grenade3,
        "ППВ": grenade4,
    }

    let img = isWeapon
        ? (myPlayer.inventory.weapon
            ? weaponImages[myPlayer.inventory.weapon?.name]
            : fist)
        : (myPlayer.inventory.grenades[grenadesPosition]
            ? grenadeImages[myPlayer.inventory.grenades[grenadesPosition].name]
            : fist)

    return (
        <div>
            <div className={styles.weaponContainer}>
                <div className={styles.imageContainer}>
                    <img src={img} alt={""} />
                </div>
                <div className={styles.infoBlock}>
                    {isWeapon ? (myPlayer.inventory.weapon ? myPlayer.inventory.weapon?.name : "Кулаки") : (myPlayer.inventory.grenades[grenadesPosition] ? myPlayer.inventory.grenades[grenadesPosition].name : "Кулаки")}
                </div>
            </div>
            <button className={styles.toggleWeaponButton} onClick={() => toggleWeapon()}>{""}</button>
            {!isWeapon
                ? <div>
                    <button className={styles.rightButton} onClick={() => setGrenadesPosition(1)}>{">"}</button>
                    <button className={styles.leftButton} onClick={() => setGrenadesPosition(-1)}>{"<"}</button>
                </div>
                : <div/>
            }
        </div>
    )
}

export default Weapon
