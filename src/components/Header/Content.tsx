import styles from "./Header.module.css";
import Avatar from "../common/Avatar/Avatar";
import HeaderTitle from "../common/Header/HeaderTitle";
import background from "../../assets/img/interface/plate.png"
import exit from "../../assets/img/interface/exit.png"
import {AuthInitialState} from "../../redux/reducers/auth-reducer";

interface Props {
    auth: AuthInitialState
    logout: () => void
    gameIsReady: boolean
}

const Content = ({auth, logout, gameIsReady}: Props) => {

    if (gameIsReady && auth.isAuth) return (
        <div className={styles.container}>
            <section className={styles.background}>
                <img alt={""} src={background}/>
            </section>
            <section className={styles.infoSection}>
                <Avatar size={50} id={auth.userId}/>
                <HeaderTitle text={auth.username} maxWidth={100}/>
                <div className={styles.exit} onClick={() => logout()}>
                    <img src={exit} alt={"exit"}/>
                </div>
            </section>
        </div>
    )

    return (
        <div className={styles.headerContainer}>
            {auth.username
                ? <section className={styles.section}>
                    <Avatar size={25} id={auth.userId}/>
                    <HeaderTitle text={auth.username}/>
                    <button onClick={() => logout()}>
                        Logout
                    </button>
                </section>
                : <div/>
            }
        </div>
    )
}

export default Content
