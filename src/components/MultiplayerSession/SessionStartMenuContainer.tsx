import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../redirect/withAuthRedirect";

class SessionStartMenuContainer extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div>
                    Session was set ^_^
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
