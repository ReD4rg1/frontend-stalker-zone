import styles from "./Fight.module.css";

interface Props {
    showFight: boolean
    toggleShowFight: () => void
    useGrenade: (playerId: number, grenadeId: number) => void
}

const Fight = ({showFight, toggleShowFight, useGrenade}:Props) => {

    return (
        <div>

        </div>
    )
}

export default Fight
