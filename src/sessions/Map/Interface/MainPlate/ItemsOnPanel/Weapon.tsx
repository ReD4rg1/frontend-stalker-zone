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

interface Props {
    toggleWeapon: () => void
    isWeapon: boolean
    myPlayer: Player
}

const Weapon = ({isWeapon, toggleWeapon, myPlayer}:Props) => {

    let weaponImages = [weapon1, weapon2, weapon3]
    let grenadeImages = [grenade1, grenade2, grenade3, grenade4]

    let img = isWeapon
        ? (myPlayer.inventory.weapon
            ? weaponImages[myPlayer.inventory.weapon?.id-1]
            : fist)
        : (myPlayer.inventory.grenades[0]
            ? grenadeImages[myPlayer.inventory.grenades[0].id-2]
            : fist)

    return (
        <div>
            <div className={styles.weaponContainer}>
                <div className={styles.imageContainer}>
                    <img src={img} alt={""} />
                </div>
                <div className={styles.infoBlock}>
                    {isWeapon ? (myPlayer.inventory.weapon ? myPlayer.inventory.weapon?.name : "Кулаки") : (myPlayer.inventory.grenades[0] ? myPlayer.inventory.grenades[0].name : "Кулаки")}
                </div>
            </div>
            <button className={styles.toggleWeaponButton} onClick={() => toggleWeapon()}>{""}</button>
        </div>
    )
}

export default Weapon
