import React, {FC} from "react";
import {IInitialState} from "../../redux/map-reducer";
import Location from "./Location";

type PropsType = {
    map: IInitialState,
    generateMap: () => void,
}

const Map: FC<PropsType> = ({map, generateMap}) => {

    let lastLocation = map.locations[map.locations.length-1]

    const mapItemsArray = map.locations.map((item, i) => {
        const hexesArray = item.allLocations.map(item => {
            return item
        })
        return <Location data={hexesArray} key={i}/>
    })



    return (
        <div>
            <section>
                <p>Generate location</p>
                <p>{lastLocation.locationID}</p>
                <button onClick={() => generateMap()}>Generate Map</button>
            </section>
            <section>
                {mapItemsArray}
            </section>
        </div>
    )
}

export default Map