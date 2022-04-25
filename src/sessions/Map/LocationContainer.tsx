import Hex from "./Hex";
import {Location} from "../../redux/reducers/map-reducer";
import styles from "./Location.module.css";
import image0 from "../../assets/img/locations-background/0.png"
import image1 from "../../assets/img/locations-background/1.png"
import image2 from "../../assets/img/locations-background/2.png"
import image3 from "../../assets/img/locations-background/3.png"
import image4 from "../../assets/img/locations-background/4.png"
import image5 from "../../assets/img/locations-background/5.png"
import image6 from "../../assets/img/locations-background/6.png"
import image7 from "../../assets/img/locations-background/7.png"
import image8 from "../../assets/img/locations-background/8.png"
import image9 from "../../assets/img/locations-background/9.png"

interface Props {
    location: Location
}

const LocationContainer = ({location}: Props) => {

    let imageSrc: string

    switch (location.id) {
        case 1:
            imageSrc = image0
            break
        case 2:
            imageSrc = image1
            break
        case 3:
            imageSrc = image2
            break
        case 4:
            imageSrc = image3
            break
        case 5:
            imageSrc = image4
            break
        case 6:
            imageSrc = image5
            break
        case 7:
            imageSrc = image6
            break
        case 8:
            imageSrc = image7
            break
        case 9:
            imageSrc = image8
            break
        case 10:
            imageSrc = image9
            break
        default:
            imageSrc = image0
            break
    }

    return (
        <section className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={imageSrc} alt={'#'}/>
            </div>
            <section className={styles.hexesContainer}>
                <section className={styles.rowOne}>
                    <Hex data={location.hexList[0]}/>
                </section>
                <section className={styles.rowTwo}>
                    <article><Hex data={location.hexList[11]}/></article>
                    <article><Hex data={location.hexList[2]}/></article>
                </section>
                <section className={styles.rowThree}>
                    <article><Hex data={location.hexList[9]}/></article>
                    <article><Hex data={location.hexList[12]}/></article>
                    <article><Hex data={location.hexList[4]}/></article>
                </section>
                <section className={styles.rowTwo}>
                    <article><Hex data={location.hexList[17]}/></article>
                    <article><Hex data={location.hexList[14]}/></article>
                </section>
                <section className={styles.rowThree}>
                    <article><Hex data={location.hexList[7]}/></article>
                    <article><Hex data={location.hexList[18]}/></article>
                    <article><Hex data={location.hexList[6]}/></article>
                </section>
                <section className={styles.rowTwo}>
                    <article><Hex data={location.hexList[15]}/></article>
                    <article><Hex data={location.hexList[16]}/></article>
                </section>
                <section className={styles.rowThree}>
                    <article><Hex data={location.hexList[5]}/></article>
                    <article><Hex data={location.hexList[13]}/></article>
                    <article><Hex data={location.hexList[8]}/></article>
                </section>
                <section className={styles.rowTwo}>
                    <article><Hex data={location.hexList[3]}/></article>
                    <article><Hex data={location.hexList[10]}/></article>
                </section>
                <section className={styles.rowOneLast}>
                    <Hex data={location.hexList[1]}/>
                </section>
            </section>
        </section>
    )
}

export default LocationContainer
