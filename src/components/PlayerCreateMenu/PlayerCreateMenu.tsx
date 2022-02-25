import {IPlayer} from "../../redux/players-reducer";


interface IProps {
    players: Array<IPlayer>
}

const PlayerCreateMenu = (props: IProps) => {
    return (
        <div>
            Players
        </div>
    )
}

export default PlayerCreateMenu