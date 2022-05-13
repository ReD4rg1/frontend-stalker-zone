import styles from "./HexSideDiff.module.css";

interface Props {
    type?: "red"
}

const Circle = ({type}: Props) => {
    if (type === "red") return <div className={styles.hexRedDiff} />
    return <div className={styles.hexDiff} />
}

export default Circle
