import art1 from '../../../assets/img/avatar/1.jpeg';
import art2 from '../../../assets/img/avatar/2.jpeg';
import art3 from '../../../assets/img/avatar/3.jpeg';
import art4 from '../../../assets/img/avatar/4.jpeg';
import art5 from '../../../assets/img/avatar/5.jpeg';
import art6 from '../../../assets/img/avatar/6.jpeg';
import art7 from '../../../assets/img/avatar/7.jpeg';
import art8 from '../../../assets/img/avatar/8.jpeg';
import art9 from '../../../assets/img/avatar/9.jpeg';
import art10 from '../../../assets/img/avatar/10.jpeg';
import {getRandomIntForInterval} from "../../../redux/generators/random-generators";
import styles from "./Avatar.module.css";

interface Props {
    size: number
}

const images = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10]

const Avatar = ({size}: Props) => {
    const randomImg = images[getRandomIntForInterval(1, 10)]

    return (
        <div className={styles.imageContainer}>
            <img src={randomImg} alt={'#Avatar'} style={{width: `${size}px`, height: `${size}px`}}/>
        </div>
    )
}

export default Avatar
