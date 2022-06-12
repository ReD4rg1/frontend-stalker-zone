import styles from "./Store.module.css";
import Item from "./Item";
import {PlayersInitialState} from "../../../redux/reducers/players-reducer";
import {ItemTypes} from "../../../api/Game/inventoryAPI";
import '../../../fonts/perfoc_bold.otf';

interface Props {
    players: PlayersInitialState
    setItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
    showStore: boolean
    closeStore: () => void
}

const Store = ({players, setItem, closeStore, showStore}: Props) => {

    if (!showStore) return null

    let location = ""
    switch (players.myPlayer.coordinates.locationName) {
        case "Посёлок":
            location = "village"
            break
        case "Военная база":
            location = "base"
            break
        case "Лаборатория":
            location = "laboratory"
            break
    }

    const findLocation = (places: string, location: string) => {

        if (places === location) return true

        let placesArray = places.split(", ")
        let found = false
        placesArray.forEach((place) => {
            if (place === location) found = true
        })

        return found
    }


    return (
        <div className={styles.container}>
            <button className={styles.exit} onClick={() => closeStore()}>{">"}</button>
            <div className={styles.mainTitle}>
                <div>{"МАГАЗИН"}</div>
            </div>
            <div className={styles.mainSection}>
                <section>
                    <div className={styles.title}>{"ЗАЩИТА"}</div>
                    <div className={styles.gridTitleContainer}>
                        <div>{"Название"}</div>
                        <div>{"Защита"}</div>
                        <div>{"Описание"}</div>
                        <div>{"Цена"}</div>
                    </div>
                    {players.shop.armors.map((item) => {
                            if (findLocation(item.place, location)) return (
                                <Item
                                    id={item.id}
                                    myPlayer={players.myPlayer}
                                    name={item.name}
                                    defense={item.defense}
                                    type={item.type}
                                    place={item.place}
                                    price={item.price}
                                    setItem={setItem}
                                    key={item.id + item.type}
                                />
                            )
                            return null
                        }
                    )}
                </section>
                <section>
                    <div className={styles.title}>{"ОРУЖИЕ"}</div>
                    <div className={styles.gridTitleContainer}>
                        <div>{"Название"}</div>
                        <div>{"Урон"}</div>
                        <div>{"Описание"}</div>
                        <div>{"Цена"}</div>
                    </div>
                    {players.shop.weapon.map((item) => {
                            if (findLocation(item.place, location)) return (
                                <Item
                                    id={item.id}
                                    name={item.name}
                                    damage={item.damage}
                                    damageBoost={item.damageBoost}
                                    description={item.description}
                                    place={item.place}
                                    price={item.price}
                                    type={'weapon'}
                                    myPlayer={players.myPlayer}
                                    setItem={setItem}
                                    key={item.id + 'weapon'}
                                />
                            )
                            return null
                        }
                    )}
                </section>
                <section>
                    <div className={styles.title}>{"МОДИФИКАЦИИ К ОРУЖИЮ"}</div>
                    <div className={styles.gridTitleContainer}>
                        <div>{"Название"}</div>
                        <div>{"+ к урону"}</div>
                        <div>{"Описание"}</div>
                        <div>{"Цена"}</div>
                    </div>
                    {players.shop.weaponModifiers.map((item) => {
                            if (findLocation(item.place, location)) return (
                                <Item
                                    id={item.id}
                                    myPlayer={players.myPlayer}
                                    name={item.name}
                                    damageModifier={item.damageModifier}
                                    type={item.type}
                                    place={item.place}
                                    price={item.price}
                                    setItem={setItem}
                                    key={item.id + item.type}
                                />
                            )
                            return null
                        }
                    )}
                </section>
                <section>
                    <div className={styles.title}>{"ГРАНАТЫ"}</div>
                    <div className={styles.gridTitleContainer}>
                        <div>{"Название"}</div>
                        <div>{"Урон"}</div>
                        <div>{"Описание"}</div>
                        <div>{"Цена"}</div>
                    </div>
                    {players.shop.grenade.map((item) => {
                            if (findLocation(item.place, location)) return (
                                <Item
                                    id={item.id}
                                    myPlayer={players.myPlayer}
                                    name={item.name}
                                    damage={item.damage}
                                    type={'grenade'}
                                    place={item.place}
                                    price={item.price}
                                    setItem={setItem}
                                    key={item.id + 'grenade'}
                                />
                            )
                            return null
                        }
                    )}
                </section>
                <section>
                    <div className={styles.title}>{"СНАРЯЖЕНИЕ"}</div>
                    <div className={styles.gridTitleContainer}>
                        <div>{"Название"}</div>
                        <div>{"Эффект"}</div>
                        <div>{"Описание"}</div>
                        <div>{"Цена"}</div>
                    </div>
                    {players.shop.equipments.map((item) => {
                            if (findLocation(item.place, location)) return (
                                <Item
                                    id={item.id}
                                    myPlayer={players.myPlayer}
                                    name={item.name}
                                    effect={item.effect}
                                    effectValue={item.effectValue}
                                    type={item.type}
                                    place={item.place}
                                    price={item.price}
                                    setItem={setItem}
                                    key={item.id + 'grenade'}
                                />
                            )
                            return null
                        }
                    )}
                </section>
            </div>
        </div>
    )
}

export default Store
