import styles from "./Header.module.css";

interface Props {
    username: string | null
    logout: () => void
}

const Header = ({username, logout}: Props) => {
    return (
        <div className={styles.headerContainer}>
            <section className={styles.section}>
                <div>
                    Avatar
                </div>
                <div>
                    {username}
                </div>
                <button onClick={() => logout()}>
                    Logout
                </button>
            </section>
        </div>
    )
}

export default Header