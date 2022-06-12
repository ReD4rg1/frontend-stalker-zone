import styles from "./MainMenu.module.css";
import {NavLink} from "react-router-dom";
import backgroundImage from "../../assets/img/main-menu/main-menu-background.gif";

const MainMenu = () => {


    return (
        <div className={styles.container}>z
            <section className={styles.imageContainer}>
                <img src={backgroundImage} alt={'#'}/>
            </section>
            <section className={styles.sectionContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.mainTitle}>
                        Зона Сталкеров
                    </h1>
                    <h2 className={styles.subTitle}>
                        Настольная игра
                    </h2>
                </div>
                <div className={styles.linkItemsContainer}>
                    <NavLink to="/login" className={({ isActive }) =>  isActive ? `${styles.active}` : ""}>
                        <div className={styles.linkItem}><span>Подключиться к сессии</span></div>
                    </NavLink>
                </div>
            </section>
        </div>
    )
}

export default MainMenu
