import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../redirect/withAuthRedirect";
import MenuContainer from "./MenuContainer";

class SessionStartMenuContainer extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div>
                    Session set ^_^
                </div>
                <div>
                    <MenuContainer />
                </div>
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth,
        players: store.players,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect,
)(SessionStartMenuContainer) as React.ComponentType
