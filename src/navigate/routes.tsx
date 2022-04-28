import {Navigate, Route, Routes} from "react-router-dom";
import MainMenu from "../components/MainMenu/MainMenu";
import LoginContainer from "../components/Login";
import PlayerCreateMenuContainer from "../sessions/LocalSession/PlayerCreateMenu/PlayerCreateMenuContainer";
import MapContainer from "../sessions/Map/MapContainer";
import SessionStartMenuContainer from "../sessions/MultiplayerSession/StartMenu";
import React from "react";
import Rooms from "../sessions/MultiplayerSession/Rooms";
import MapMultiplayerContainer from "../sessions/Map/MapMultiplayerContainer";

const Navigates = () => {
    return (
        <Routes>
            <Route path={"/main_menu"} element={
                <MainMenu />
            } />
            <Route path={"/login"} element={
                <LoginContainer />
            } />
            <Route path={""} element={<Navigate to={"/main_menu"} />} />



            <Route path={"/players_create_menu"} element={
                <PlayerCreateMenuContainer />
            } />
            <Route path={"/session"} element={
                <MapContainer />
            } />



            <Route path={"/multiplayer"} element={
                <Rooms />
            } />
            <Route path={"/multiplayer/room"} element={
                <SessionStartMenuContainer />
            } />
            <Route path={"/multiplayer/map"} element={
                <MapMultiplayerContainer />
            } />
        </Routes>
    )
}

export default Navigates
