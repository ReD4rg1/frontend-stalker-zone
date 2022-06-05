import art0 from '../../../assets/img/avatar/0.jpg';
import art1 from '../../../assets/img/avatar/1.jpg';
import art2 from '../../../assets/img/avatar/2.jpg';
import art3 from '../../../assets/img/avatar/3.jpg';
import art4 from '../../../assets/img/avatar/4.jpg';
import art5 from '../../../assets/img/avatar/5.jpg';
import art6 from '../../../assets/img/avatar/6.jpg';
import art7 from '../../../assets/img/avatar/7.jpg';
import art8 from '../../../assets/img/avatar/8.jpg';
import art9 from '../../../assets/img/avatar/9.jpg';
import styles from "./Avatar.module.css";

interface Props {
    size: number
    id?: number | null
}

const getRandomIntForInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const images = [art0, art1, art2, art3, art4, art5, art6, art7, art8, art9]

const Avatar = ({size, id}: Props) => {
    const img = id ? images[id % 10] : images[getRandomIntForInterval(0, 9)]

    return (
        <div className={styles.imageContainer}>
            <img src={img} alt={'#Avatar'} style={{width: `${size}px`, height: `${size}px`}}/>
        </div>
    )
}

export default Avatar
