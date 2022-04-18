import styles from "./Header.module.css";
import Avatar from "../common/Avatar/Avatar";
import HeaderTitle from "../common/Header/HeaderTitle";

interface Props {
    username: string | null
    logout: () => void
}

const Content = ({username, logout}: Props) => {
    return (
        <div className={styles.headerContainer}>
            {username
                ? <section className={styles.section}>
                    <Avatar size={25}/>
                    <HeaderTitle text={username}/>
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