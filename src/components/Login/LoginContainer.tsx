import backgroundImage from "../../assets/img/main-menu/main-menu-background.gif";
import styles from "./Login.module.css";
import {useState} from "react";
import LoginForm from "./LoginForm";

const LoginContainer = () => {

    const [haveAccount, setHaveAccount] = useState(true)

    return (
        <div className={styles.container}>
            <section className={styles.imageContainer}>
                <img src={backgroundImage} alt={'#'}/>
            </section>
            <section className={styles.sectionContainer}>
                <div>
                    <h1>{haveAccount ? 'Войти в аккаунт' : 'Создать аккаунт'}</h1>
                </div>
                {haveAccount
                    ? <div>
                        <LoginForm/>
                    </div>
                    : <div>

                    </div>
                }
            </section>
        </div>
    )
}

export default LoginContainer