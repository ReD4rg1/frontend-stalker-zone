interface IProps {
    min: number,
    max: number,
    length: number,
    isLocationArray: boolean
}

export const getLocationsQueueArray = (props: IProps) => {

    let locationsArray: Array<number> = []
    let i: number = 0

    const arrayIsNotContainThisNumber = (number: number) => {

        let isNotContain: boolean = true

        locationsArray.forEach((item) => {
            if (item === number) isNotContain = false
        })

        return isNotContain
    }

    while (locationsArray.length < props.length) {

        let randomNumber = getRandomIntForInterval(props.min, props.max)

        if (i === 5 && props.isLocationArray) {
            locationsArray.push(i)
            i++
        }
        else if (arrayIsNotContainThisNumber(randomNumber) && randomNumber !== 5) {
            locationsArray.push(randomNumber)
            i++
        }
    }

    console.log('locationsArray: ', locationsArray)
    return locationsArray
}

export const getRandomIntForInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}