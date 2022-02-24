import Hex from "./Hex";
import {IHex} from "../../redux/map-reducer";
import styles from "./Location.module.css"

interface IProps {
    data: Array<IHex>
}

const Location = (props: IProps) => {

    const hexesArray = props.data



    return (
        <section className={styles.container}>
            <section className={styles.rowOne}>
                <Hex data={hexesArray[0]}/>
            </section>
            <section className={styles.rowTwo}>
                <article><Hex data={hexesArray[11]}/></article>
                <article><Hex data={hexesArray[2]}/></article>
            </section>
            <section className={styles.rowThree}>
                <article><Hex data={hexesArray[9]}/></article>
                <article><Hex data={hexesArray[12]}/></article>
                <article><Hex data={hexesArray[4]}/></article>
            </section>
            <section className={styles.rowTwo}>
                <article><Hex data={hexesArray[17]}/></article>
                <article><Hex data={hexesArray[14]}/></article>
            </section>
            <section className={styles.rowThree}>
                <article><Hex data={hexesArray[7]}/></article>
                <article><Hex data={hexesArray[18]}/></article>
                <article><Hex data={hexesArray[6]}/></article>
            </section>
            <section className={styles.rowTwo}>
                <article><Hex data={hexesArray[15]}/></article>
                <article><Hex data={hexesArray[16]}/></article>
            </section>
            <section className={styles.rowThree}>
                <article><Hex data={hexesArray[5]}/></article>
                <article><Hex data={hexesArray[13]}/></article>
                <article><Hex data={hexesArray[8]}/></article>
            </section>
            <section className={styles.rowTwo}>
                <article><Hex data={hexesArray[3]}/></article>
                <article><Hex data={hexesArray[10]}/></article>
            </section>
            <section className={styles.rowOneLast}>
                <Hex data={hexesArray[1]}/>
            </section>
        </section>
    )
}

export default Location