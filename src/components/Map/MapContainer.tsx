import React from 'react';
import Map from "./Map";
import {connect} from "react-redux";
import {generateMap} from "../../redux/map-reducer";

class MapContainer extends React.Component<any, any>{

    componentDidMount() {
        this.props.generateMap()
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
        map: store.map
    }
}

export default connect(mapStateToProps,
    {generateMap})(MapContainer)
