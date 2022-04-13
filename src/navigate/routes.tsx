import {Navigate, Route, Routes} from "react-router-dom";
import MainMenu from "../components/MainMenu/MainMenu";
import LoginContainer from "../components/Login";
import PlayerCreateMenuContainer from "../sessions/LocalSession/PlayerCreateMenu/PlayerCreateMenuContainer";
import MapContainer from "../sessions/LocalSession/Map/MapContainer";
import SessionStartMenuContainer from "../sessions/MultiplayerSession/StartMenu/SessionStartMenuContainer";
import React from "react";


const Navigates = () => {
    return (
        <Routes>
            <Route path={"/main_menu"} element={
                <MainMenu/>
            }/>
            <Route path={"/login"} element={
                <LoginContainer/>
            }/>
            <Route path={"/players_create_menu"} element={
                <PlayerCreateMenuContainer/>
            }/>
            <Route path={"/session"} element={
                <MapContainer/>
            }/>
            <Route path={"/multiplayer"} element={
                <SessionStartMenuContainer />
            }/>
            <Route path={""} element={<Navigate to={"/main_menu"}/>}/>
        </Routes>
    )
}

export default Navigates
