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
input.onGesture(Gesture.Shake, function () {
    basic.pause(100)
    basic.showLeds(`
        . . . . .
        # # # # #
        # . . . #
        . # . # .
        . . # . .
        `)
    basic.showNumber(mintemp)
    basic.pause(100)
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
let maxtemp = 0
let mintemp = 0
let TargetTemp = 0
let realtemp = input.temperature()
TargetTemp = 22
mintemp = realtemp
maxtemp = realtemp
basic.forever(function () {
    basic.showNumber(input.temperature())
    realtemp = input.temperature()
    serial.writeValue("temperatura", input.temperature())
    serial.writeValue("Calentador", pins.digitalReadPin(DigitalPin.P0))
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
    basic.pause(500)
})
