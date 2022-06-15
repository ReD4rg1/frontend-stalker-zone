type CoordsType = {
    hexId: number
    locationId: number
}

interface Props {
    playerCoords: CoordsType
    finishCoords: CoordsType
}

const angleEvent = ({playerCoords, finishCoords}: Props) => {

    let playerXY = getCoords(playerCoords)
    let finishXY = getCoords(finishCoords)

    let AB = Math.sqrt(Math.pow(finishXY.x - playerXY.x, 2) + Math.pow(finishXY.y - playerXY.y, 2))
    let AC = Math.sqrt(Math.pow(finishXY.x - playerXY.x, 2) + Math.pow(finishXY.y - (playerXY.y - 500), 2))
    let BC = Math.sqrt(Math.pow(playerXY.x - playerXY.x, 2) + Math.pow((playerXY.y - 500) - playerXY.y, 2))

    let angle: number = (Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)) * 180) / Math.PI

    if (playerXY.x >= finishXY.x) return 360 - angle

    return angle
}

type GetCoordsType = {
    x: number
    y: number
}

const getCoords = (coords: CoordsType): GetCoordsType => {
    let elem: HTMLElement | null = document.getElementById(`${coords.hexId + '/' + coords.locationId}`)

    if (elem) return {
        x: elem.getBoundingClientRect().x,
        y: elem.getBoundingClientRect().y,
    }

    return {
        x: 0,
        y: 0,
    }
}

type sidesType = "top" | "topLeft" | "topRight"  | "bottom" | "bottomLeft" | "bottomRight"

const getSideByCoords = ({playerCoords, finishCoords}: Props):sidesType | null => {
    const angle = angleEvent({playerCoords, finishCoords})
    if (angle > 330 || angle < 30) return "top"
    if (angle > 300) return "topLeft"
    if (angle > 0 && angle < 90) return "topRight"
    if (angle >= 150 && angle < 210) return "bottom"
    if (angle >= 210 && angle < 270) return "bottomLeft"
    if (angle > 180) return "bottomRight"

    console.log("angle: ", angle)

    return null
}

export default getSideByCoords
