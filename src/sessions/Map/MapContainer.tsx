import React from 'react';
import Map from "./Map";
import {connect} from "react-redux";
import {fetchMap, generateMap, MapInitialState} from "../../redux/reducers/map-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

interface MapProps {
    map: MapInitialState
    fetchMap: () => void
}

class MapContainer extends React.Component<MapProps, any>{

    componentDidMount() {
        //if (this.props.map.mapIsGenerated === false) this.props.generateMap(this.props.players)
        this.props.fetchMap()
    }

    render() {
        return (
            <div>
                <Map map={this.props.map} />
            </div>
        )
    }
}

let mapStateToProps = (store: AppStateType) => {
    return {
        map: store.map,
        players: store.players
    }
}

export default compose(
    connect(mapStateToProps, {generateMap, fetchMap}),

)(MapContainer) as React.ComponentType
