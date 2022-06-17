import styles from "./Fight.module.css";
import {Player} from "../../../redux/reducers/players-reducer";
import {FightType, MonsterInitialState} from "../../../redux/reducers/monster-reducer";

interface Props {
    availableAttack: boolean
    turn: "monster" | "player"
    myPlayer: Player
    monster: MonsterInitialState
    escapeFromFight: (playerId: number, rep: number) => void
    playerAttack: (playerId: number, grenadeId:number, isWeapon: boolean) => void
    monsterAttack: FightType
    nextMember: FightType
    playerDied: FightType
    endFight: (playerId: number, monsterLevel: number) => void
    isWeapon: boolean
    grenadesPosition: number
}

const FightButtons = ({
    availableAttack,
    escapeFromFight,
    myPlayer,
    playerAttack,
    monsterAttack,
    playerDied,
    isWeapon,
    nextMember,
    endFight,
    monster,
    turn,
    grenadesPosition,
}: Props) => {

    if (monster.healPoint <= 0) return (
        <div className={styles.buttonContainer}>
            <button onClick={() => endFight(myPlayer.id, monster.level)}>{"Завершить бой"}</button>
        </div>
    )

    if (myPlayer.hp <= 0) return (
        <div className={styles.buttonContainer}>
            <button onClick={() => playerDied(myPlayer.id)}>{"Вы теряете силы"}</button>
        </div>
    )

    const attack = () => {

        if (turn === "monster" ) monsterAttack(myPlayer.id)
        else {
            if (myPlayer.inventory.grenades.length > 0) playerAttack(myPlayer.id, myPlayer.inventory.grenades[grenadesPosition].id, isWeapon)
            else playerAttack(myPlayer.id, 0 , isWeapon)
        }
    }

    return (
        <div className={styles.buttonContainer}>
            {!availableAttack
                ? <button onClick={() => attack()}>{"Атака"}</button>
                : <button onClick={() => nextMember(myPlayer.id)}>{"Завершить ход"}</button>
            }
            <button
                disabled={availableAttack || turn === "monster"}
                onClick={() => escapeFromFight(myPlayer.id, myPlayer.reputation)}
            >
                {"Сбежать"}
            </button>
        </div>
    )
}

export default FightButtons
