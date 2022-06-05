import styles from "./Scanner.module.css";
import {Player} from "../../../../redux/reducers/players-reducer";

interface Props {
    myPlayer: Player
}

const Scanner = ({myPlayer}: Props) => {

    return (
        <div>
            <div className={styles.scanContainer}>
                <div className={styles.scan}/>
            </div>
        </div>
    )
}

export default Scanner
