import {IHex, IInitialState, ILocation} from "./map-reducer";
import * as hexesDifficultyInfo from './Objects/Map/kinds-of-hexes.json';
import * as locationsInfo from './Objects/Map/filling-location-hexes-info.json';
import {getLocationsQueueArray, getRandomIntForInterval} from "./random-generators";

type PropsType = {
    state: IInitialState
}

const locationsQueueArray = getLocationsQueueArray({min: 0, max: 9, length: 10, isLocationArray: true})

interface IGenerateLocationItem {
    first: number | null,
    second: number | null,
    third: number | null,
    fourth: number | null,
    fifth: number | null,
    sixth: number | null,
    locationNumber: number,
}

interface IGetRandomHex {
    HexId: number,
    sides: SidesType
}

interface IGetHex {
    HexId: number,

    sides: SidesType

    isLocation: boolean,
    isSpecialLocation: boolean,
    locationName: string,
    locationLevel: number | null,
}

type SidesType = {
    topId: number | null,
    topLeftId: number | null,
    topRightId: number | null,
    bottomId: number | null,
    bottomLeftId: number | null,
    bottomRightId: number | null,
}

type CurrentLocationItemType = {
    "HexId": number | null,
    "isLocation": boolean,
    "isSpecialLocation": boolean,
    "locationName": string,
    "locationLevel": number | null
}


const getRandomHex = (props: IGetRandomHex): IHex => {

    const randomInt: number = getRandomIntForInterval(1, 22)

    const hexDifficultyInfoObject = JSON.parse(JSON.stringify(hexesDifficultyInfo))[randomInt]

    let hex = {
        HexId: props.HexId,
        players: [],
        isActive: false,
        isLocation: false,
        isSpecialLocation: false,
        locationName: null,
        locationLevel: null,
        Top: checkEpicenterSide(props.sides.topId, props.HexId, hexDifficultyInfoObject.difficulty.top),
        TopLeft: checkEpicenterSide(props.sides.topLeftId, props.HexId, hexDifficultyInfoObject.difficulty.topLeft),
        TopRight: checkEpicenterSide(props.sides.topRightId, props.HexId, hexDifficultyInfoObject.difficulty.topRight),
        Bottom: checkEpicenterSide(props.sides.bottomId, props.HexId, hexDifficultyInfoObject.difficulty.bottom),
        BottomLeft: checkEpicenterSide(props.sides.bottomLeftId, props.HexId, hexDifficultyInfoObject.difficulty.bottomLeft),
        BottomRight: checkEpicenterSide(props.sides.bottomRightId, props.HexId, hexDifficultyInfoObject.difficulty.bottomRight)
    }

    return hex
}

const checkLocationName = (locationName: string) => {
    let locationNumber: number

    switch (locationName) {
        case "Эпицентр - 1 уровень":
            locationNumber = 23
            break
        case "Эпицентр - 2 уровень":
            locationNumber = 24
            break
        case "Эпицентр - 3 уровень":
            locationNumber = 25
            break
        case "Эпицентр - 4 уровень":
            locationNumber = 26
            break
        case "Эпицентр - 5 уровень":
            locationNumber = 27
            break
        case "Эпицентр - 6 уровень":
            locationNumber = 28
            break
        case "Эпицентр":
            locationNumber = 29
            break
        default:
            locationNumber = getRandomIntForInterval(1, 11)
    }

    return locationNumber
}

const checkEpicenterSide = (sideId: number | null, hexId: number, defaultDiff: number) => {

    if (hexId !== null && hexId !== ( 15 || 135 || 145 || 155 || 165 || 175 || 185 || 195 )) {
        switch (sideId) {
            case 135:
            case 145:
            case 155:
            case 165:
            case 175:
            case 185:
                return {
                    moveId: sideId,
                    difficulty: 20
                }
            default:
                return {
                    moveId: sideId,
                    difficulty: defaultDiff
                }
        }
    } else if (hexId === 15 && sideId === 135) return {
        moveId: sideId,
        difficulty: 6
    }



    return {
        moveId: sideId,
        difficulty: defaultDiff
    }
}

const getHex = (props: IGetHex): IHex => {

    const randomInt: number = checkLocationName(props.locationName)

    const hexDifficultyInfoObject = JSON.parse(JSON.stringify(hexesDifficultyInfo))[randomInt]

    let hex = {
        HexId: props.HexId,
        players: [],
        isActive: false,
        isLocation: props.isLocation,
        isSpecialLocation: props.isSpecialLocation,
        locationName: props.locationName,
        locationLevel: props.locationLevel,
        Top: {
            moveId: props.sides.topId,
            difficulty: hexDifficultyInfoObject.difficulty.top
        },
        TopLeft: {
            moveId: props.sides.topLeftId,
            difficulty: hexDifficultyInfoObject.difficulty.topLeft
        },
        TopRight: {
            moveId: props.sides.topRightId,
            difficulty: hexDifficultyInfoObject.difficulty.topRight
        },
        Bottom: {
            moveId: props.sides.bottomId,
            difficulty: hexDifficultyInfoObject.difficulty.bottom
        },
        BottomLeft: {
            moveId: props.sides.bottomLeftId,
            difficulty: hexDifficultyInfoObject.difficulty.bottomLeft
        },
        BottomRight: {
            moveId: props.sides.bottomRightId,
            difficulty: hexDifficultyInfoObject.difficulty.bottomRight
        }
    }

    return hex
}



const getHexesArray = (locations: Array<any>, props: IGenerateLocationItem): Array<IHex> => {

    let hexesArray: Array<IHex> = []

    for (let i = 1; i < 20; i++) {

        let isNotContain: boolean = true

        let currentLocationItem: CurrentLocationItemType = {
            "HexId": null,
            "isLocation": false,
            "isSpecialLocation": false,
            "locationName": '',
            "locationLevel": null
        }

        locations.forEach((item) => {
            if (item.HexId === i) {
                isNotContain = false
                currentLocationItem = item
            }
        })



        let sides: SidesType

        switch (i) {
            case 1:
                sides = {
                    topId: props.sixth ? parseInt('9'+ props.sixth) : null,
                    topLeftId: props.sixth ? parseInt('11'+ props.sixth) : null,
                    topRightId: props.first ? parseInt('6'+ props.first) : null,
                    bottomId: parseInt('13'+ props.locationNumber),
                    bottomLeftId: parseInt('12'+ props.locationNumber),
                    bottomRightId: parseInt('3'+ props.locationNumber),
                }
                break
            case 2:
                sides = {
                    topId: parseInt('14'+ props.locationNumber),
                    topLeftId: parseInt('4'+ props.locationNumber),
                    topRightId: parseInt('11'+ props.locationNumber),
                    bottomId: props.third ? parseInt('10'+ props.third) : null,
                    bottomLeftId: props.fourth ? parseInt('5'+ props.fourth) : null,
                    bottomRightId: props.third ? parseInt('12'+ props.third) : null,
                }
                break
            case 3:
                sides = {
                    topId: props.first ? parseInt('6'+ props.first) : null,
                    topLeftId: parseInt('1'+ props.locationNumber),
                    topRightId: props.first ? parseInt('4'+ props.first) : null,
                    bottomId: parseInt('15'+ props.locationNumber),
                    bottomLeftId: parseInt('13'+ props.locationNumber),
                    bottomRightId: parseInt('5'+ props.locationNumber),
                }
                break
            case 4:
                sides = {
                    topId: parseInt('16'+ props.locationNumber),
                    topLeftId: parseInt('6'+ props.locationNumber),
                    topRightId: parseInt('14'+ props.locationNumber),
                    bottomId: props.fourth ? parseInt('5'+ props.fourth) : null,
                    bottomLeftId: props.fourth ? parseInt('3'+ props.fourth) : null,
                    bottomRightId: parseInt('2'+ props.locationNumber),
                }
                break
            case 5:
                sides = {
                    topId: props.first ? parseInt('4'+ props.first) : null,
                    topLeftId: parseInt('3'+ props.locationNumber),
                    topRightId: props.first ? parseInt('2'+ props.first) : null,
                    bottomId: parseInt('7'+ props.locationNumber),
                    bottomLeftId: parseInt('15'+ props.locationNumber),
                    bottomRightId: props.second ? parseInt('10'+ props.second) : null,
                }
                break
            case 6:
                sides = {
                    topId: parseInt('8'+ props.locationNumber),
                    topLeftId: props.fifth ? parseInt('9'+ props.fifth) : null,
                    topRightId: parseInt('16'+ props.locationNumber),
                    bottomId: props.fourth ? parseInt('3'+ props.fourth) : null,
                    bottomLeftId: props.fourth ? parseInt('1'+ props.fourth) : null,
                    bottomRightId: parseInt('4'+ props.locationNumber),
                }
                break
            case 7:
                sides = {
                    topId: parseInt('5'+ props.locationNumber),
                    topLeftId: parseInt('15'+ props.locationNumber),
                    topRightId: props.second ? parseInt('10'+ props.second) : null,
                    bottomId: parseInt('9'+ props.locationNumber),
                    bottomLeftId: parseInt('17'+ props.locationNumber),
                    bottomRightId: props.second ? parseInt('8'+ props.second) : null,
                }
                break
            case 8:
                sides = {
                    topId: parseInt('10'+ props.locationNumber),
                    topLeftId: props.fifth ? parseInt('7'+ props.fifth) : null,
                    topRightId: parseInt('18'+ props.locationNumber),
                    bottomId: parseInt('6'+ props.locationNumber),
                    bottomLeftId: props.fifth ? parseInt('9'+ props.fifth) : null,
                    bottomRightId: parseInt('16'+ props.locationNumber),
                }
                break
            case 9:
                sides = {
                    topId: parseInt('7'+ props.locationNumber),
                    topLeftId: parseInt('17'+ props.locationNumber),
                    topRightId: props.second ? parseInt('8'+ props.second) : null,
                    bottomId: props.third ? parseInt('1'+ props.third) : null,
                    bottomLeftId: parseInt('11'+ props.locationNumber),
                    bottomRightId: props.second ? parseInt('6'+ props.second) : null,
                }
                break
            case 10:
                sides = {
                    topId: props.sixth ? parseInt('2'+ props.sixth) : null,
                    topLeftId: props.fifth ? parseInt('5'+ props.fifth) : null,
                    topRightId: parseInt('12'+ props.locationNumber),
                    bottomId: parseInt('8'+ props.locationNumber),
                    bottomLeftId: props.fifth ? parseInt('7'+ props.fifth) : null,
                    bottomRightId: parseInt('18'+ props.locationNumber),
                }
                break
            case 11:
                sides = {
                    topId: parseInt('17'+ props.locationNumber),
                    topLeftId: parseInt('14'+ props.locationNumber),
                    topRightId: parseInt('9'+ props.locationNumber),
                    bottomId: props.third ? parseInt('12'+ props.third) : null,
                    bottomLeftId: parseInt('2'+ props.locationNumber),
                    bottomRightId: props.third ? parseInt('1'+ props.third) : null,
                }
                break
            case 12:
                sides = {
                    topId: props.sixth ? parseInt('11'+ props.sixth) : null,
                    topLeftId: props.sixth ? parseInt('2'+ props.sixth) : null,
                    topRightId: parseInt('1'+ props.locationNumber),
                    bottomId: parseInt('18'+ props.locationNumber),
                    bottomLeftId: parseInt('10'+ props.locationNumber),
                    bottomRightId: parseInt('13'+ props.locationNumber),
                }
                break
            case 13:
                sides = {
                    topId: parseInt('1'+ props.locationNumber),
                    topLeftId: parseInt('12'+ props.locationNumber),
                    topRightId: parseInt('3'+ props.locationNumber),
                    bottomId: parseInt('19'+ props.locationNumber),
                    bottomLeftId: parseInt('18'+ props.locationNumber),
                    bottomRightId: parseInt('15'+ props.locationNumber),
                }
                break
            case 14:
                sides = {
                    topId: parseInt('19'+ props.locationNumber),
                    topLeftId: parseInt('16'+ props.locationNumber),
                    topRightId: parseInt('17'+ props.locationNumber),
                    bottomId: parseInt('2'+ props.locationNumber),
                    bottomLeftId: parseInt('4'+ props.locationNumber),
                    bottomRightId: parseInt('11'+ props.locationNumber),
                }
                break
            case 15:
                sides = {
                    topId: parseInt('3'+ props.locationNumber),
                    topLeftId: parseInt('13'+ props.locationNumber),
                    topRightId: parseInt('5'+ props.locationNumber),
                    bottomId: parseInt('17'+ props.locationNumber),
                    bottomLeftId: parseInt('19'+ props.locationNumber),
                    bottomRightId: parseInt('7'+ props.locationNumber),
                }
                break
            case 16:
                sides = {
                    topId: parseInt('18'+ props.locationNumber),
                    topLeftId: parseInt('8'+ props.locationNumber),
                    topRightId: parseInt('19'+ props.locationNumber),
                    bottomId: parseInt('4'+ props.locationNumber),
                    bottomLeftId: parseInt('6'+ props.locationNumber),
                    bottomRightId: parseInt('14'+ props.locationNumber),
                }
                break
            case 17:
                sides = {
                    topId: parseInt('15'+ props.locationNumber),
                    topLeftId: parseInt('19'+ props.locationNumber),
                    topRightId: parseInt('7'+ props.locationNumber),
                    bottomId: parseInt('11'+ props.locationNumber),
                    bottomLeftId: parseInt('14'+ props.locationNumber),
                    bottomRightId: parseInt('9'+ props.locationNumber),
                }
                break
            case 18:
                sides = {
                    topId: parseInt('12'+ props.locationNumber),
                    topLeftId: parseInt('10'+ props.locationNumber),
                    topRightId: parseInt('13'+ props.locationNumber),
                    bottomId: parseInt('16'+ props.locationNumber),
                    bottomLeftId: parseInt('8'+ props.locationNumber),
                    bottomRightId: parseInt('19'+ props.locationNumber),
                }
                break
            case 19:
                sides = {
                    topId: parseInt('13'+ props.locationNumber),
                    topLeftId: parseInt('18'+ props.locationNumber),
                    topRightId: parseInt('15'+ props.locationNumber),
                    bottomId: parseInt('14'+ props.locationNumber),
                    bottomLeftId: parseInt('16'+ props.locationNumber),
                    bottomRightId: parseInt('17'+ props.locationNumber),
                }
                break
            default:
                sides = {
                    topId: null,
                    topLeftId: null,
                    topRightId: null,
                    bottomId: null,
                    bottomLeftId: null,
                    bottomRightId: null,
                }
        }



        if (isNotContain) {
            hexesArray.push(getRandomHex({
                HexId: parseInt(`${i}` + props.locationNumber),
                sides: sides
            }))
        } else {
            hexesArray.push(getHex({
                HexId: parseInt(`${i}` + props.locationNumber),
                sides: sides,
                isLocation: currentLocationItem.isLocation,
                isSpecialLocation: currentLocationItem.isSpecialLocation,
                locationName: currentLocationItem.locationName,
                locationLevel: currentLocationItem.locationLevel,
            }))
        }
    }


    return hexesArray
}

const generateLocationItem = (props: IGenerateLocationItem): ILocation => {

    const currentLocationObject = locationsInfo[props.locationNumber]

    const newLocation = {
        locationName: null,
        locationID: currentLocationObject.id,
        allLocations: getHexesArray(currentLocationObject.locations,props)
    }

    return newLocation
}

const getGeneratedMap = (props: PropsType): IInitialState => {

    let newMap: IInitialState = props.state
    let newLocation: ILocation

    for (let i = 0; i < 10; i++) {

        switch (i) {
            case 0:
                newLocation = generateLocationItem({
                    first: null,
                    second: locationsQueueArray[1],
                    third: locationsQueueArray[4],
                    fourth: null,
                    fifth: null,
                    sixth: null,
                    locationNumber: locationsQueueArray[0],
                })
                newMap = {locations: [{...newLocation}]}
                break
            case 1:
                newLocation = generateLocationItem({
                    first: null,
                    second: locationsQueueArray[2],
                    third: locationsQueueArray[5],
                    fourth: locationsQueueArray[4],
                    fifth: locationsQueueArray[0],
                    sixth: null,
                    locationNumber: locationsQueueArray[1],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 2:
                newLocation = generateLocationItem({
                    first: null,
                    second: locationsQueueArray[3],
                    third: locationsQueueArray[6],
                    fourth: locationsQueueArray[5],
                    fifth: locationsQueueArray[1],
                    sixth: null,
                    locationNumber: locationsQueueArray[2],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 3:
                newLocation = generateLocationItem({
                    first: null,
                    second: null,
                    third: null,
                    fourth: locationsQueueArray[6],
                    fifth: locationsQueueArray[2],
                    sixth: null,
                    locationNumber: locationsQueueArray[3],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 4:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[1],
                    second: locationsQueueArray[5],
                    third: locationsQueueArray[7],
                    fourth: null,
                    fifth: null,
                    sixth: locationsQueueArray[0],
                    locationNumber: locationsQueueArray[4],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 5:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[2],
                    second: locationsQueueArray[6],
                    third: locationsQueueArray[8],
                    fourth: locationsQueueArray[7],
                    fifth: locationsQueueArray[4],
                    sixth: locationsQueueArray[1],
                    locationNumber: locationsQueueArray[5],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 6:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[3],
                    second: null,
                    third: null,
                    fourth: locationsQueueArray[8],
                    fifth: locationsQueueArray[5],
                    sixth: locationsQueueArray[2],
                    locationNumber: locationsQueueArray[6],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 7:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[5],
                    second: locationsQueueArray[8],
                    third: locationsQueueArray[9],
                    fourth: null,
                    fifth: null,
                    sixth: locationsQueueArray[4],
                    locationNumber: locationsQueueArray[7],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 8:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[6],
                    second: null,
                    third: null,
                    fourth: locationsQueueArray[9],
                    fifth: locationsQueueArray[7],
                    sixth: locationsQueueArray[5],
                    locationNumber: locationsQueueArray[8],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
            case 9:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[8],
                    second: null,
                    third: null,
                    fourth: null,
                    fifth: null,
                    sixth: locationsQueueArray[7],
                    locationNumber: locationsQueueArray[9],
                })
                newMap = {locations: [...newMap.locations, {...newLocation}]}
                break
        }
    }

    return newMap
}

export default getGeneratedMap