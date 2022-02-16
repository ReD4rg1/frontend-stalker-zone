import React from 'react';
import Example from "./Example";
import {connect} from "react-redux";
import {generateMap} from "../redux/map-reducer";

class ExampleComponent extends React.Component<any, any>{

    render() {
        return (
            <div>
                <Example map={this.props.map}
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
    {generateMap})(ExampleComponent)
