import React from "react";
import Store from "./Store";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {getShop, PlayersInitialState, setItem} from "../../../redux/reducers/players-reducer";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";
import {ItemTypes} from "../../../api/Game/inventoryAPI";

interface Props {
    players: PlayersInitialState
    auth: AuthInitialState
    getShop: () => void
    setItem: (playerId: number, itemId: number, price: number, type: ItemTypes) => void
}

class StoreContainer extends React.Component<Props, any> {

    componentDidMount() {
        if (!this.props.players.shopLoaded) this.props.getShop()
    }

    render() {
        return <Store players={this.props.players} setItem={this.props.setItem}/>
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        players: store.players,
        auth: store.auth,
    }
}

export default connect(
    mapStateToProps, {getShop, setItem}
)(StoreContainer) as React.ComponentType

