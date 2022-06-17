import styles from "./Fight.module.css";
import background from "../../../assets/img/monsters/fight.png";
import {FightType, MonsterInitialState} from "../../../redux/reducers/monster-reducer";
import {Player, PlayersInitialState} from "../../../redux/reducers/players-reducer";
import {updateFight} from "../../../api/Game/ws/gameWS";
import FightButtons from "./FightButtons";

interface Props {
    monster: MonsterInitialState
    players: PlayersInitialState
    showFight: boolean
    toggleShowFight: () => void
    playerAttack: FightType
    monsterAttack: FightType
    nextMember: FightType
    playerDied: FightType
    endFight: (playerId: number, monsterLevel: number) => void
    isWeapon: boolean
    escapeFromFight: (playerId: number, rep: number) => void
    grenadesPosition: number
}

const Fight = ({
    showFight,
    toggleShowFight,
    monster,
    players,
    isWeapon,
    endFight,
    playerAttack,
    playerDied,
    monsterAttack,
    nextMember,
    escapeFromFight,
    grenadesPosition,
}:Props) => {

    const inFight = (player: Player) => {
        return player.states.inFight
    }

    if (players.players.some(inFight) && showFight) {

        let player = players.myPlayer
        players.players.forEach((p) => {
            if (p.states.inFight) player = p
            if (!monster.monsterSet) {
                updateFight()
            }
        })

        let turn: "player" | "monster" = "player"
        let availableAttack = false
        if (monster.fightQueue[0]) {
            if (monster.fightQueue[0].active) {
                turn = monster.fightQueue[0].member
                availableAttack = monster.fightQueue[0].attack
            }
            if (monster.fightQueue[1].active) {
                turn = monster.fightQueue[1].member
                availableAttack = monster.fightQueue[1].attack
            }
        }

        return (
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={background} alt={""}/>
                </div>
                <section className={styles.monsterSection}>
                    <div className={styles.mainTitle}>{"Монстр"}</div>
                    <div className={styles.statsContainer}>
                        <div className={styles.statItem}>
                            <div>{"Вид: "}</div>
                            <div>{monster.name}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Уровень: "}</div>
                            <div>{monster.level}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Здоровье: "}</div>
                            <div>{monster.healPoint}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Регенерация: "}</div>
                            <div>{monster.regeneration}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Атака: "}</div>
                            <div>{monster.damage + `${monster.damageModifier <= 0 ? "" : "+"}` + monster.damageModifier}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Защита: "}</div>
                            <div>{monster.defense}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Ходит первый: "}</div>
                            <div>{monster.firstMove ? "Да" : "Нет"}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Кол-во паралича: "}</div>
                            <div>{monster.paralysis}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Кол-во первых атак: "}</div>
                            <div>{monster.numberOfAttacks}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Трофей: "}</div>
                            <div>{monster.trophy}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Стоимость трофея: "}</div>
                            <div>{monster.trophyPrice}</div>
                        </div>
                        <div style={{marginTop: "10px"}} className={styles.statItem}>
                            <div>{"Описание: "}</div>
                            <div>{monster.description}</div>
                        </div>
                    </div>
                </section>
                <section className={styles.playerSection}>
                    <div className={styles.mainTitle}>{"Игрок"}</div>
                    <div className={styles.statsContainer}>
                        <div className={styles.statItem}>
                            <div>{"Позывной: "}</div>
                            <div>{player.name}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Здоровье: "}</div>
                            <div>{player.hp}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Репутация: "}</div>
                            <div>{player.reputation}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Защита: "}</div>
                            <div>{player.armor}</div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Урон: "}</div>
                            <div>{player.inventory.weapon
                                ? player.inventory.weapon?.damage + "+" + (
                                (player.inventory.weaponFirstLevelModifier ? player.inventory.weaponFirstLevelModifier?.damageModifier : 0)
                                + (player.inventory.weaponSecondLevelModifier ? player.inventory.weaponSecondLevelModifier?.damageModifier : 0)
                                + (player.inventory.weaponThirdLevelModifier ? player.inventory.weaponThirdLevelModifier?.damageModifier : 0)
                                + (player.effects.damageBoost)
                            )
                                : "1" + (-2 + player.effects.damageBoost)}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div>{"Парализован: "}</div>
                            <div>{player.states.paralyze ? "Да" : "Нет"}</div>
                        </div>
                    </div>
                </section>
                <section className={styles.buttonSection}>
                    <div>
                        {`Сейчас ходит ${turn === "player" ? "игрок" : "монстр"}`}
                    </div>
                    <FightButtons
                        turn={turn}
                        escapeFromFight={escapeFromFight}
                        endFight={endFight}
                        monster={monster}
                        monsterAttack={monsterAttack}
                        myPlayer={players.myPlayer}
                        availableAttack={availableAttack}
                        grenadesPosition={grenadesPosition}
                        isWeapon={isWeapon}
                        playerAttack={playerAttack}
                        playerDied={playerDied}
                        nextMember={nextMember}
                    />
                </section>
                <div className={styles.closeButton} onClick={() => toggleShowFight()}>
                    {"Свернуть"}
                </div>
            </div>
        )
    }

    if (players.players.some(inFight)) return (
        <div className={styles.fightShowButton} onClick={() => toggleShowFight()}>
            {"Сражение"}
        </div>
    )

    return null
}

export default Fight
