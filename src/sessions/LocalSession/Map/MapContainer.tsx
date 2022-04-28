import React from 'react';
import Map from "./Map";
import {connect} from "react-redux";
import {generateMap} from "../../../redux/reducers/map-reducer";

class MapContainer extends React.Component<any, any>{

    componentDidMount() {
        if (this.props.map.mapIsGenerated === false) this.props.generateMap(this.props.players)
    }

    render() {
        return (
            <div>
                <Map map={this.props.map}
                     generateMap={this.props.generateMap}
                />
            </div>
        )
    }
}

let mapStateToProps = (store: any) => {
    return {
        map: store.map,
        players: store.players
    }
}

export default connect(mapStateToProps,
    {generateMap})(MapContainer)
