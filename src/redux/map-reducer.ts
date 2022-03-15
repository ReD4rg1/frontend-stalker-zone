import getGeneratedMap from "./generate-map";

const GENERATE_MAP = "GENERATE-MAP"

export interface IInitialState {
    locations: Array<ILocation>
    mapIsGenerated: boolean
}

export interface ILocation {
    locationName: string | null,
    locationID: number,
    allLocations: Array<IHex>
}

export interface IHex {
    HexId: number,
    players: Array<any>,
    isActive: boolean,
    isLocation: boolean,
    isSpecialLocation: boolean,
    locationName: string | null,
    locationLevel: number | null,
    Top: HexSideType,
    TopLeft: HexSideType,
    TopRight: HexSideType,
    Bottom: HexSideType,
    BottomLeft: HexSideType,
    BottomRight: HexSideType
}

type HexSideType = {
    moveId: number | null,
    difficulty: number | null
}



let initialState: IInitialState = {
    locations: [
        {
            locationName: 'Лаборатория',
            locationID: 1,
            allLocations: [
                {
                    HexId: 1,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 9,
                        difficulty: 2,
                    },
                    TopLeft: {
                        moveId: 11,
                        difficulty: 0,
                    },
                    TopRight: {
                        moveId: 6,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 13,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 12,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 3,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 2,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 14,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 4,
                        difficulty: 3,
                    },
                    TopRight: {
                        moveId: 11,
                        difficulty: 3,
                    },
                    Bottom: {
                        moveId: 10,
                        difficulty: 3,
                    },
                    BottomLeft: {
                        moveId: 5,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 12,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 3,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 6,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 1,
                        difficulty: 1,
                    },
                    TopRight: {
                        moveId: 4,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 15,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 13,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 5,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 4,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 16,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 6,
                        difficulty: 0,
                    },
                    TopRight: {
                        moveId: 14,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 5,
                        difficulty: 1,
                    },
                    BottomLeft: {
                        moveId: 3,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 2,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 5,
                    players: [],
                    isActive: false,
                    isLocation: true,
                    isSpecialLocation: false,
                    locationName: 'Исследовательский зверинец',
                    locationLevel: null,
                    Top: {
                        moveId: 4,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 3,
                        difficulty: 3,
                    },
                    TopRight: {
                        moveId: 2,
                        difficulty: 3,
                    },
                    Bottom: {
                        moveId: 7,
                        difficulty: 3,
                    },
                    BottomLeft: {
                        moveId: 15,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 10,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 6,
                    players: [],
                    isActive: false,
                    isLocation: true,
                    isSpecialLocation: false,
                    locationName: 'Руины НИИ радиологии',
                    locationLevel: null,
                    Top: {
                        moveId: 8,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 9,
                        difficulty: 0,
                    },
                    TopRight: {
                        moveId: 16,
                        difficulty: 2,
                    },
                    Bottom: {
                        moveId: 3,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 1,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 4,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 7,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 5,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 15,
                        difficulty: 2,
                    },
                    TopRight: {
                        moveId: 10,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 9,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 17,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 8,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 8,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 10,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 7,
                        difficulty: 0,
                    },
                    TopRight: {
                        moveId: 18,
                        difficulty: 1,
                    },
                    Bottom: {
                        moveId: 6,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 9,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 16,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 9,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 7,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 17,
                        difficulty: 3,
                    },
                    TopRight: {
                        moveId: 8,
                        difficulty: 3,
                    },
                    Bottom: {
                        moveId: 1,
                        difficulty: 3,
                    },
                    BottomLeft: {
                        moveId: 11,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 6,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 10,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 2,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 5,
                        difficulty: 3,
                    },
                    TopRight: {
                        moveId: 12,
                        difficulty: 3,
                    },
                    Bottom: {
                        moveId: 8,
                        difficulty: 3,
                    },
                    BottomLeft: {
                        moveId: 7,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 18,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 11,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 17,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 14,
                        difficulty: 1,
                    },
                    TopRight: {
                        moveId: 9,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 12,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 2,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 1,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 12,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 11,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 2,
                        difficulty: 1,
                    },
                    TopRight: {
                        moveId: 1,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 18,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 10,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 13,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 13,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 1,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 12,
                        difficulty: 4,
                    },
                    TopRight: {
                        moveId: 3,
                        difficulty: 4,
                    },
                    Bottom: {
                        moveId: 19,
                        difficulty: 4,
                    },
                    BottomLeft: {
                        moveId: 18,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 15,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 14,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 19,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 16,
                        difficulty: 4,
                    },
                    TopRight: {
                        moveId: 17,
                        difficulty: 4,
                    },
                    Bottom: {
                        moveId: 2,
                        difficulty: 4,
                    },
                    BottomLeft: {
                        moveId: 4,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 1,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 15,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 3,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 13,
                        difficulty: 4,
                    },
                    TopRight: {
                        moveId: 5,
                        difficulty: 4,
                    },
                    Bottom: {
                        moveId: 17,
                        difficulty: 4,
                    },
                    BottomLeft: {
                        moveId: 19,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 7,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 16,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 18,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 8,
                        difficulty: 4,
                    },
                    TopRight: {
                        moveId: 19,
                        difficulty: 4,
                    },
                    Bottom: {
                        moveId: 4,
                        difficulty: 4,
                    },
                    BottomLeft: {
                        moveId: 6,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 14,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 17,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 15,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 19,
                        difficulty: 0,
                    },
                    TopRight: {
                        moveId: 7,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 11,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 14,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 9,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 18,
                    players: [],
                    isActive: false,
                    isLocation: false,
                    isSpecialLocation: false,
                    locationName: null,
                    locationLevel: null,
                    Top: {
                        moveId: 12,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 10,
                        difficulty: 4,
                    },
                    TopRight: {
                        moveId: 13,
                        difficulty: 4,
                    },
                    Bottom: {
                        moveId: 16,
                        difficulty: 4,
                    },
                    BottomLeft: {
                        moveId: 8,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 19,
                        difficulty: 0,
                    },
                },
                {
                    HexId: 19,
                    players: [],
                    isActive: false,
                    isLocation: true,
                    isSpecialLocation: true,
                    locationName: 'Лаборатория',
                    locationLevel: null,
                    Top: {
                        moveId: 13,
                        difficulty: 0,
                    },
                    TopLeft: {
                        moveId: 18,
                        difficulty: 0,
                    },
                    TopRight: {
                        moveId: 15,
                        difficulty: 0,
                    },
                    Bottom: {
                        moveId: 14,
                        difficulty: 0,
                    },
                    BottomLeft: {
                        moveId: 16,
                        difficulty: 0,
                    },
                    BottomRight: {
                        moveId: 17,
                        difficulty: 0,
                    },
                },
            ]
        }
    ],
    mapIsGenerated: false
};

const mapReducer = (state = initialState, action: any): IInitialState => {
    switch (action.type) {
        case GENERATE_MAP:
            return getGeneratedMap({state})

        default:
            return state
    }
};

type GenerateMapType = {
    type: typeof GENERATE_MAP
}

export const generateMap = ():GenerateMapType => ({type: GENERATE_MAP})

export default mapReducer