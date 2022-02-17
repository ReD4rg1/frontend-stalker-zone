import React, {FC} from "react";
import {IInitialState} from "../../redux/map-reducer";

type PropsType = {
    map: IInitialState,
    generateMap: () => void,
}

const Map: FC<PropsType> = ({map, generateMap}) => {

    let lastLocation = map.locations[map.locations.length-1]

    return (
        <div>
            <p>Example</p>
            <p>{lastLocation.locationID}</p>
            <button onClick={() => generateMap()}>Generate Map</button>
        </div>
    )
}

export default Map