import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {initialize} from './redux/reducers/app-reducer';
import HeaderContainer from "./components/Header";
import Navigates from "./navigate/routes";


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
                        <HeaderContainer />
                    </header>
                    <Navigates/>
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
