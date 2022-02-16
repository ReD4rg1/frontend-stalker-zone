export const getLocationsQueueArray = () => {

    let locationsArray: Array<number> = []
    let i: number = 0

    const randomIntFromInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const arrayIsNotContainThisNumber = (number: number) => {

        let isNotContain: boolean = true

        locationsArray.forEach((item) => {
            if (item === number) isNotContain = false
        })

        return isNotContain
    }

    while (locationsArray.length < 10) {

        let randomNumber = randomIntFromInterval(0, 9)

        if (i === 5) {
            locationsArray.push(i)
            i++
        }
        else if (arrayIsNotContainThisNumber(randomNumber) && i !== 5) {
            locationsArray.push(randomNumber)
            i++
        }
    }

    return locationsArray
}