input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
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
input.onGesture(Gesture.Shake, function on_gesture_shake() {
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
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
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
basic.forever(function on_forever() {
    
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
    
    basic.pause(5000)
    basic.showLeds(`
        . # # . .
        . # # . .
        # # # # .
        # # # # .
        . # # . .
        `)
    basic.showNumber(input.temperature())
})
