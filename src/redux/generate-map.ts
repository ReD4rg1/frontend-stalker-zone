import {IInitialState, ILocation} from "./map-reducer";
import * as mapObjects from './kinds-of-hexes.json';
import * as gexInfo from './filling-location-hexes-info.json';
import {getLocationsQueueArray} from "./random-generators";

type PropsType = {
    state: IInitialState
}

const locationsQueueArray = getLocationsQueueArray()


const getGeneratedMap = (props: PropsType): IInitialState => {
    const newLocation: ILocation = {...props.state.locations[0], locationID: 2}

    const newMap = {locations: [{...props.state.locations[0]}, {...newLocation}]}

    return newMap
}

export default getGeneratedMap