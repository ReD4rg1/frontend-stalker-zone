import React, {Component} from 'react';
import './App.css';
import MapContainer from "./components/SinglePlayerSession/Map/MapContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {connect} from "react-redux";
import PlayerCreateMenuContainer from "./components/SinglePlayerSession/PlayerCreateMenu/PlayerCreateMenuContainer";
import MainMenu from "./components/MainMenu/MainMenu";
import LoginContainer from "./components/Login/LoginContainer";
import {initialize} from './redux/app-reducer';
import {Navigate} from "react-router-dom";
import SessionStartMenuContainer from './components/MultiplayerSession/SessionStartMenuContainer';
import HeaderContainer from "./components/Header/HeaderContainer";

class App extends Component<any, any> {

    componentDidMount() {
        if (!this.props.app.initialized) {
            this.props.initialize();
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header>
                        <HeaderContainer/>
                    </header>
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
                </div>
            </BrowserRouter>
        )
    }
}

let mapStateToProps = (store: any) => {
    return {
        app: store.app,
    }
}

export default connect(mapStateToProps, {initialize})(App)
