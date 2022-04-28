import preloader from "../../../assets/img/loading/loading.svg"
import React from "react";
import style from "./Preloader.module.css"

interface Props {
    fetching: boolean
}

const Preloader = ({fetching}: Props) => {

    return (<>
            {
                fetching ?
                <div className={style.container}>
                    <img src={preloader} alt='#'/>
                </div> : <div/>
            }
        </>
    )
}

export default Preloader
