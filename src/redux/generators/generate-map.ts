import {IHex, MapInitialState, Location} from "../reducers/map-reducer";
import * as hexesDifficultyInfo from '../Objects/Map/kinds-of-hexes.json';
import * as locationsInfo from '../Objects/Map/filling-location-hexes-info.json';
import {getLocationsQueueArray, getRandomIntForInterval} from "./random-generators";
import {Player} from "../reducers/players-reducer";

type PropsType = {
    state: MapInitialState
    players: Player[]
}

const locationsQueueArray = getLocationsQueueArray({min: 0, max: 9, length: 10, isLocationArray: true})

interface GenerateLocationItem {
    first: number
    second: number
    third: number
    fourth: number
    fifth: number
    sixth: number
    locationNumber: number
}

interface GetRandomHex {
    hexId: number
    locationId: number
    sides: SidesType
}

interface GetHex {
    hexId: number
    locationId: number
    sides: SidesType

    isLocation: boolean
    isSpecialLocation: boolean
    locationName: string
    locationLevel: number
}

type SidesType = {
    topId: number
    locationTopId: number
    topLeftId: number
    locationTopLeftId: number
    topRightId: number
    locationTopRightId: number
    bottomId: number
    locationBottomId: number
    bottomLeftId: number
    locationBottomLeftId: number
    bottomRightId: number
    locationBottomRightId: number
}

type CurrentLocationItemType = {
    "HexId": number
    "isLocation": boolean
    "isSpecialLocation": boolean
    "locationName": string
    "locationLevel": number
}


const getRandomHex = (props: GetRandomHex): IHex => {

    const randomInt: number = getRandomIntForInterval(1, 22)

    const hexDifficultyInfoObject = JSON.parse(JSON.stringify(hexesDifficultyInfo))[randomInt]

    return {
        hexId: props.hexId,
        locationId: props.locationId,
        playerList: [],
        active: false,
        containLocation: false,
        specialLocation: false,
        locationName: "",
        locationLevel: 0,
        top: checkEpicenterSide(props.sides.topId, props.hexId, props.sides.locationTopId, hexDifficultyInfoObject.difficulty.top),
        topLeft: checkEpicenterSide(props.sides.topLeftId, props.hexId, props.sides.locationTopLeftId, hexDifficultyInfoObject.difficulty.topLeft),
        topRight: checkEpicenterSide(props.sides.topRightId, props.hexId, props.sides.locationTopRightId, hexDifficultyInfoObject.difficulty.topRight),
        bottom: checkEpicenterSide(props.sides.bottomId, props.hexId, props.sides.locationBottomId, hexDifficultyInfoObject.difficulty.bottom),
        bottomLeft: checkEpicenterSide(props.sides.bottomLeftId, props.hexId, props.sides.locationBottomLeftId, hexDifficultyInfoObject.difficulty.bottomLeft),
        bottomRight: checkEpicenterSide(props.sides.bottomRightId, props.hexId, props.sides.locationBottomRightId, hexDifficultyInfoObject.difficulty.bottomRight)
    }
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

const checkEpicenterSide = (sideId: number, hexId: number, locationId: number, defaultDiff: number) => {

    if (locationId === 5 && hexId !== ( 1 || 13 || 14 || 15 || 16 || 17 || 18 || 19 )) {
        switch (sideId) {
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
                return {
                    moveId: sideId,
                    locationId: locationId,
                    difficulty: 20
                }
            default:
                return {
                    moveId: sideId,
                    locationId: locationId,
                    difficulty: defaultDiff
                }
        }
    } else if (locationId === 5 && hexId === 1 && sideId === 13) return {
        moveId: sideId,
        locationId: locationId,
        difficulty: 6
    }



    return {
        moveId: sideId,
        locationId: locationId,
        difficulty: defaultDiff
    }
}

const getHex = (props: GetHex): IHex => {

    const randomInt: number = checkLocationName(props.locationName)

    const hexDifficultyInfoObject = JSON.parse(JSON.stringify(hexesDifficultyInfo))[randomInt]

    return {
        hexId: props.hexId,
        playerList: [],
        active: false,
        containLocation: props.isLocation,
        specialLocation: props.isSpecialLocation,
        locationName: props.locationName,
        locationLevel: props.locationLevel,
        locationId: props.locationId,
        top: {
            moveId: props.sides.topId,
            locationId: props.sides.locationTopId,
            difficulty: hexDifficultyInfoObject.difficulty.top
        },
        topLeft: {
            moveId: props.sides.topLeftId,
            locationId: props.sides.locationTopLeftId,
            difficulty: hexDifficultyInfoObject.difficulty.topLeft
        },
        topRight: {
            moveId: props.sides.topRightId,
            locationId: props.sides.locationTopRightId,
            difficulty: hexDifficultyInfoObject.difficulty.topRight
        },
        bottom: {
            moveId: props.sides.bottomId,
            locationId: props.sides.locationBottomId,
            difficulty: hexDifficultyInfoObject.difficulty.bottom
        },
        bottomLeft: {
            moveId: props.sides.bottomLeftId,
            locationId: props.sides.locationBottomLeftId,
            difficulty: hexDifficultyInfoObject.difficulty.bottomLeft
        },
        bottomRight: {
            moveId: props.sides.bottomRightId,
            locationId: props.sides.locationBottomRightId,
            difficulty: hexDifficultyInfoObject.difficulty.bottomRight
        }
    }
}



const getHexesArray = (locations: Array<any>, {first, second, third, fourth, fifth, sixth, locationNumber}: GenerateLocationItem): Array<IHex> => {

    let hexesArray: Array<IHex> = []

    for (let i = 1; i < 20; i++) {

        let isNotContain: boolean = true

        let currentLocationItem: CurrentLocationItemType = {
            "HexId": 0,
            "isLocation": false,
            "isSpecialLocation": false,
            "locationName": '',
            "locationLevel": 0
        }

        locations.forEach((item) => {
            if (item.HexId === i) {
                isNotContain = false
                currentLocationItem = item
            }
        })

        const getSide = (
                topId: number,
                locationTopId: number,
                topLeftId: number,
                locationTopLeftId: number,
                topRightId: number,
                locationTopRightId: number,
                bottomId: number,
                locationBottomId: number,
                bottomLeftId: number,
                locationBottomLeftId: number,
                bottomRightId: number,
                locationBottomRightId: number,
            ) => (
            {
                topId: topId,
                locationTopId: locationTopId,
                topLeftId: topLeftId,
                locationTopLeftId: locationTopLeftId,
                topRightId: topRightId,
                locationTopRightId: locationTopRightId,
                bottomId: bottomId,
                locationBottomId: locationBottomId,
                bottomLeftId: bottomLeftId,
                locationBottomLeftId: locationBottomLeftId,
                bottomRightId: bottomRightId,
                locationBottomRightId: locationBottomRightId,
            }
        )

        let sides: SidesType

        switch (i) {
            case 1:
                sides = getSide(
                    9, sixth, 11, sixth,
                    6, first, 13, locationNumber,
                    12, locationNumber, 3, locationNumber
                )
                break
            case 2:
                sides = getSide(
                    14, locationNumber, 4, locationNumber,
                    11, locationNumber, 10, third,
                    5, fourth, 12, third
                )
                break
            case 3:
                sides = getSide(
                    6, first, 1, locationNumber,
                    4, first, 15, locationNumber,
                    13, locationNumber, 5, locationNumber
                )
                break
            case 4:
                sides = getSide(
                    16, locationNumber, 6, locationNumber,
                    14, locationNumber, 5, fourth,
                    3, fourth, 2, locationNumber
                )
                break
            case 5:
                sides = getSide(
                    4, first, 3, locationNumber,
                    2, first, 7, locationNumber,
                    15, locationNumber, 10, second
                )
                break
            case 6:
                sides = getSide(
                    8, locationNumber, 9, fifth,
                    16, locationNumber, 3, fourth,
                    1, fourth, 4, locationNumber
                )
                break
            case 7:
                sides = getSide(
                    5, locationNumber, 15, locationNumber,
                    10, second, 9, locationNumber,
                    17, locationNumber, 8, second
                )
                break
            case 8:
                sides = getSide(
                    10, locationNumber, 7, fifth,
                    18, locationNumber, 6, locationNumber,
                    9, fifth, 16, locationNumber
                )
                break
            case 9:
                sides = getSide(
                    7, locationNumber, 17, locationNumber,
                    8, second, 1, third,
                    11, locationNumber, 6, second
                )
                break
            case 10:
                sides = getSide(
                    2, sixth, 5, fifth,
                    12, locationNumber, 8, locationNumber,
                    7, fifth, 18, locationNumber
                )
                break
            case 11:
                sides = getSide(
                    17, locationNumber, 14, locationNumber,
                    9, locationNumber, 12, third,
                    2, locationNumber, 1, third
                )
                break
            case 12:
                sides = getSide(
                    11, sixth, 2, sixth,
                    1, locationNumber, 18, locationNumber,
                    10, locationNumber, 13, locationNumber
                )
                break
            case 13:
                sides = getSide(
                    1, locationNumber, 12, locationNumber,
                    3, locationNumber, 19, locationNumber,
                    18, locationNumber, 15, locationNumber
                )
                break
            case 14:
                sides = getSide(
                    19, locationNumber, 16, locationNumber,
                    17, locationNumber, 2, locationNumber,
                    4, locationNumber, 11, locationNumber
                )
                break
            case 15:
                sides = getSide(
                    3, locationNumber, 13, locationNumber,
                    5, locationNumber, 17, locationNumber,
                    19, locationNumber, 7, locationNumber
                )
                break
            case 16:
                sides = getSide(
                    18, locationNumber, 8, locationNumber,
                    19, locationNumber, 4, locationNumber,
                    6, locationNumber, 14, locationNumber
                )
                break
            case 17:
                sides = getSide(
                    15, locationNumber, 19, locationNumber,
                    7, locationNumber, 11, locationNumber,
                    14, locationNumber, 9, locationNumber
                )
                break
            case 18:
                sides = getSide(
                    12, locationNumber, 10, locationNumber,
                    13, locationNumber, 16, locationNumber,
                    8, locationNumber, 19, locationNumber
                )
                break
            case 19:
                sides = getSide(
                    13, locationNumber, 18, locationNumber,
                    15, locationNumber, 14, locationNumber,
                    16, locationNumber, 17, locationNumber
                )
                break
            default:
                sides = getSide(
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                )
        }



        if (isNotContain) {
            hexesArray.push(getRandomHex({
                hexId: parseInt(`${i}` + locationNumber),
                locationId: locationNumber,
                sides: sides
            }))
        } else {
            hexesArray.push(getHex({
                hexId: parseInt(`${i}` + locationNumber),
                locationId: locationNumber,
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

const generateLocationItem = (props: GenerateLocationItem): Location => {

    const currentLocationObject = locationsInfo[props.locationNumber]

    return {
        id: currentLocationObject.id,
        hexList: getHexesArray(currentLocationObject.locations,props)
    }
}

const getGeneratedMap = (props: PropsType): MapInitialState => {

    let newMap: Array<Location> = props.state.locations
    let newLocation: Location

    for (let i = 0; i < 10; i++) {

        switch (i) {
            case 0:
                newLocation = generateLocationItem({
                    first: 0,
                    second: locationsQueueArray[1],
                    third: locationsQueueArray[4],
                    fourth: 0,
                    fifth: 0,
                    sixth: 0,
                    locationNumber: locationsQueueArray[0],
                })
                newMap = [{...newLocation}]
                break
            case 1:
                newLocation = generateLocationItem({
                    first: 0,
                    second: locationsQueueArray[2],
                    third: locationsQueueArray[5],
                    fourth: locationsQueueArray[4],
                    fifth: locationsQueueArray[0],
                    sixth: 0,
                    locationNumber: locationsQueueArray[1],
                })
                newMap = [...newMap, {...newLocation}]
                break
            case 2:
                newLocation = generateLocationItem({
                    first: 0,
                    second: locationsQueueArray[3],
                    third: locationsQueueArray[6],
                    fourth: locationsQueueArray[5],
                    fifth: locationsQueueArray[1],
                    sixth: 0,
                    locationNumber: locationsQueueArray[2],
                })
                newMap = [...newMap, {...newLocation}]
                break
            case 3:
                newLocation = generateLocationItem({
                    first: 0,
                    second: 0,
                    third: 0,
                    fourth: locationsQueueArray[6],
                    fifth: locationsQueueArray[2],
                    sixth: 0,
                    locationNumber: locationsQueueArray[3],
                })
                newMap = [...newMap, {...newLocation}]
                break
            case 4:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[1],
                    second: locationsQueueArray[5],
                    third: locationsQueueArray[7],
                    fourth: 0,
                    fifth: 0,
                    sixth: locationsQueueArray[0],
                    locationNumber: locationsQueueArray[4],
                })
                newMap = [...newMap, {...newLocation}]
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
                newMap = [...newMap, {...newLocation}]
                break
            case 6:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[3],
                    second: 0,
                    third: 0,
                    fourth: locationsQueueArray[8],
                    fifth: locationsQueueArray[5],
                    sixth: locationsQueueArray[2],
                    locationNumber: locationsQueueArray[6],
                })
                newMap = [...newMap, {...newLocation}]
                break
            case 7:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[5],
                    second: locationsQueueArray[8],
                    third: locationsQueueArray[9],
                    fourth: 0,
                    fifth: 0,
                    sixth: locationsQueueArray[4],
                    locationNumber: locationsQueueArray[7],
                })
                newMap = [...newMap, {...newLocation}]
                break
            case 8:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[6],
                    second: 0,
                    third: 0,
                    fourth: locationsQueueArray[9],
                    fifth: locationsQueueArray[7],
                    sixth: locationsQueueArray[5],
                    locationNumber: locationsQueueArray[8],
                })
                newMap = [...newMap, {...newLocation}]
                break
            case 9:
                newLocation = generateLocationItem({
                    first: locationsQueueArray[8],
                    second: 0,
                    third: 0,
                    fourth: 0,
                    fifth: 0,
                    sixth: locationsQueueArray[7],
                    locationNumber: locationsQueueArray[9],
                })
                newMap = [...newMap, {...newLocation}]
                break
        }
    }

    return (
        {
            locations: [...newMap],
            mapIsGenerated: true
        }
    )
}

export default getGeneratedMap
