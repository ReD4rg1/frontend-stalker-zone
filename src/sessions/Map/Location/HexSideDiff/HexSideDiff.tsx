import styles from "./HexSideDiff.module.css";
import Circle from "./Circle";

interface Props {
    difficulty: number
    type: "t" | "tL" | "tR" | "b" | "bL" | "bR"
}

const sideRotation = {
    t: 90,
    tL: 30,
    tR: -30,
    b: 90,
    bL: -30,
    bR: 30,
}

const HexSideDiff = ({difficulty, type}: Props) => {

    switch (difficulty) {

        case 0:
            return null

        case 1:
            return (
                <div className={styles.containerOne}>
                    <Circle/>
                </div>
            )

        case 2:
            return (
                <div className={styles.containerTwo}>
                    <div style={{transform: `rotate(${sideRotation[type]}deg)`}}>
                        <Circle/>
                        <Circle/>
                    </div>
                </div>
            )

        case 3:
            return (
                <div className={styles.containerThree}>
                    <div style={{transform: `rotate(${sideRotation[type]}deg)`}}>
                        <Circle/>
                        <Circle/>
                        <Circle/>
                    </div>
                </div>
            )

        case 4:
            return (
                <div className={styles.containerFour}>
                    <div style={{transform: `rotate(${sideRotation[type]}deg)`}}>
                        <div className={styles.subContainerFour}>
                            <div>
                                <Circle/>
                                <Circle/>
                            </div>
                            <div>
                                <Circle/>
                                <Circle/>
                            </div>
                        </div>
                    </div>
                </div>
            )

        case 5:
            return (
                <div className={styles.containerFive}>
                    <div style={{transform: `rotate(${sideRotation[type]}deg)`}}>
                        <div className={styles.subContainerFive}>
                            <section>
                                <Circle/>
                                <Circle/>
                            </section>
                            <section>
                                <Circle/>
                            </section>
                            <section>
                                <Circle/>
                                <Circle/>
                            </section>
                        </div>
                    </div>
                </div>
            )

        case 6:
            return (
                <div className={styles.containerSix}>
                    <div style={{transform: `rotate(${sideRotation[type]}deg)`}}>
                        <div className={styles.subContainerFour}>
                            <div>
                                <Circle/>
                                <Circle/>
                                <Circle/>
                            </div>
                            <div>
                                <Circle/>
                                <Circle/>
                                <Circle/>
                            </div>
                        </div>
                    </div>
                </div>
            )

        case 20:
            return (
                <div className={styles.containerRed}>
                    <div style={{transform: `rotate(${sideRotation[type]}deg)`}}>
                        <Circle type={"red"}/>
                    </div>
                </div>
            )

        default:
            return (
                <div>
                    {difficulty}
                </div>
            )
    }
}

export default HexSideDiff
