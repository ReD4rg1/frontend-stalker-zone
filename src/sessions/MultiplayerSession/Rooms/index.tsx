import React from "react";
import {AppStateType} from "../../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../redirect/withAuthRedirect";
import {disconnectFromRoom, getRooms, joinToRoom, RoomInitialState} from "../../../redux/reducers/room-reducer";
import Room from "./Room";
import HeaderTitle from "../../../components/common/Header/HeaderTitle";
import styles from "./index.module.css";
import Button from "../../../components/common/ReloadButton/Button";
import { withSessionRedirect } from "../../../redirect/withSessionRedirect";
import {NavLink} from "react-router-dom";
import mapAPI from "../../../api/Game/mapAPI";
import backgroundImage from "../../../assets/img/main-menu/main-menu-background.gif";

interface RoomsProps {
    rooms: RoomInitialState
    getRooms: () => void
    joinToRoom: () => void
    disconnectFromRoom: () => void
}

class Rooms extends React.Component<RoomsProps, any> {

    componentDidMount() {
        this.props.getRooms()
    }

    render() {
        return (
            <main className={styles.mainContainer}>
                <section className={styles.imageContainer}>
                    <img src={backgroundImage} alt={'#'}/>
                </section>
                <div className={styles.rooms}>
                    <section className={styles.header}>
                        <HeaderTitle text="Список комнат"/>
                        <Button onClick={() => this.props.getRooms()} type="common" />
                    </section>
                    <section className={styles.titles}>
                        <h4>Название комнаты</h4>
                        <h4>Количество игроков</h4>
                    </section>
                    <section>
                        {this.props.rooms.rooms.map((room) => (
                            <Room room={room} key={room.id} joinToRoom={this.props.joinToRoom} />
                        ))}
                    </section>
                    <section className={styles.backLinkContainer}>
                        <NavLink to="/main_menu" className={({ isActive }) =>  isActive ? `${styles.active}` : ""}>
                            <div className={styles.backLink}><span>{'<'}</span></div>
                        </NavLink>
                    </section>
                    <section>
                        <button onClick={() => mapAPI.deleteMap()}>
                            {"Удалить карту"}
                        </button>
                    </section>
                </div>
            </main>
        )
    }
}



let mapStateToProps = (store: AppStateType) => {
    return {
        rooms: store.rooms
    }
}

export default compose(
    connect(mapStateToProps, {getRooms, joinToRoom, disconnectFromRoom}),
    withSessionRedirect, withAuthRedirect,
)(Rooms) as React.ComponentType
