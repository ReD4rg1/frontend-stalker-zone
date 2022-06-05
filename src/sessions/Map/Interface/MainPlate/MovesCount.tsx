import styles from "./MovesCount.module.css";

interface Props {
    count: number
}

const MovesCount = ({count}: Props) => {

    let divisions = []

    for (let i = 0; i < count; i++) {
        divisions.push(
            <div key={i} style={{
                position: `fixed`,
                bottom: `234px`,
                right: `${794 - 11 * i}px`,
                backgroundColor: `#99ff0090`,
                borderRadius: `1px`,
                width: `11px`,
                height: `14px`,
                border: `solid 1px #3052004f`,
            }}>

            </div>
        )
    }

    return (
        <div className={styles.container}>
            {divisions}
        </div>
    )
}

export default MovesCount
