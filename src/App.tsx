import React, {Component} from 'react';
import './App.css';
import MapContainer from "./components/Map/MapContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {connect} from "react-redux";
import PlayerCreateMenuContainer from "./components/PlayerCreateMenu/PlayerCreateMenuContainer";

class App extends Component<any, any> {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <PlayerCreateMenuContainer/>
                    <MapContainer/>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (store: any) => {
    return {
        app: store.app,
    }
}

export default connect(mapStateToProps)(App);