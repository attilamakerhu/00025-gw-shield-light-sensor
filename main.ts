// This function changes a number by diff amount. The returned number will be within the given limits floor and ceiling.
function change_number (num: number, positive_direction: boolean, diff: number, floor: number, ceiling: number) {
    if (positive_direction) {
        num += diff
    } else {
        num += -1 * diff
    }
    num = limiter(num, floor, ceiling)
    return num
}
// This function takes in a three numbers. It return the num value if it is within the given limits. Otherwise it returns the closest limit.
function limiter (num: number, min_value: number, max_value: number) {
    if (num < min_value) {
        return min_value
    } else if (num > max_value) {
        return max_value
    } else {
        return num
    }
}
input.onPinPressed(TouchPin.P2, function () {
    if (debugMode) {
        debugMode = false
    } else {
        debugMode = true
    }
})
function adjustUpperThreshold () {
    difference = limiter(2 ** count, 1, speedLimit)
    if (input.buttonIsPressed(Button.A)) {
        upper_threshold = change_number(upper_threshold, true, difference, 1, 1023)
        count += 1
    } else if (input.buttonIsPressed(Button.B)) {
        upper_threshold = change_number(upper_threshold, false, difference, 1, 1023)
        count += 1
    } else {
        count = 0
    }
    if (debugMode) {
        serial.writeValue("upper", upper_threshold)
    }
}
let currentTime = 0
let count = 0
let num = 0
let debugMode = false
let difference = 0
let speedLimit = 0
let upper_threshold = 0
let startTime = input.runningTime()
let period = 200
upper_threshold = 500
speedLimit = 100
difference = 1
debugMode = false
basic.forever(function () {
    currentTime = input.runningTime()
    if (currentTime - startTime >= period) {
        adjustUpperThreshold()
        startTime = currentTime
    }
    led.plotBarGraph(
    pins.analogReadPin(AnalogPin.P1),
    upper_threshold
    )
})
