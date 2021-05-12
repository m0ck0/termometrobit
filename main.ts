input.onButtonPressed(Button.A, function () {
    TargetTemp += -1
    basic.showLeds(`
        . # # # .
        # . . . #
        # . . . #
        . # . # .
        . # # # .
        `)
    basic.showNumber(TargetTemp)
})
input.onButtonPressed(Button.B, function () {
    TargetTemp += 1
    basic.showLeds(`
        . # # # .
        # . . . #
        # . . . #
        . # . # .
        . # # # .
        `)
    basic.showNumber(TargetTemp)
})
input.onGesture(Gesture.Shake, function () {
    basic.showLeds(`
        . . . . .
        # # # # #
        # . . . #
        . # . # .
        . . # . .
        `)
    basic.showNumber(mintemp)
    basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        # # # # #
        . . . . .
        `)
    basic.showNumber(maxtemp)
    basic.clearScreen()
})
let maxtemp = 0
let mintemp = 0
let TargetTemp = 0
bluetooth.startUartService()
let realtemp = input.temperature()
TargetTemp = 22
mintemp = realtemp
maxtemp = realtemp
basic.forever(function () {
    realtemp = input.temperature()
    bluetooth.uartWriteValue("real temp", realtemp)
    bluetooth.uartWriteValue("min", mintemp)
    bluetooth.uartWriteValue("max", maxtemp)
    bluetooth.uartWriteValue("calentador", TargetTemp)
    bluetooth.uartWriteLine("----------------------------")
    if (input.temperature() <= TargetTemp) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
    if (input.temperature() > TargetTemp) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    if (realtemp < mintemp) {
        mintemp = realtemp
    }
    if (realtemp > maxtemp) {
        maxtemp = realtemp
    }
    basic.pause(3000)
    basic.showLeds(`
        . # # . .
        . # # . .
        # # # # .
        # # # # .
        . # # . .
        `)
    basic.showNumber(input.temperature())
})
