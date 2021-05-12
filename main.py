def on_button_pressed_a():
    global TargetTemp
    TargetTemp += -1
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        . # . # .
        . # # # .
        """)
    basic.show_number(TargetTemp)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_shake():
    basic.show_leds("""
        . . . . .
        # # # # #
        # . . . #
        . # . # .
        . . # . .
        """)
    basic.show_number(mintemp)
    basic.show_leds("""
        . . # . .
        . # . # .
        # . . . #
        # # # # #
        . . . . .
        """)
    basic.show_number(maxtemp)
    basic.clear_screen()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_button_pressed_b():
    global TargetTemp
    TargetTemp += 1
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        . # . # .
        . # # # .
        """)
    basic.show_number(TargetTemp)
input.on_button_pressed(Button.B, on_button_pressed_b)

maxtemp = 0
mintemp = 0
TargetTemp = 0
realtemp = input.temperature()
TargetTemp = 22
mintemp = realtemp
maxtemp = realtemp

def on_forever():
    global realtemp, mintemp, maxtemp
    realtemp = input.temperature()
    serial.write_value("temperatura", input.temperature())
    serial.write_value("Calentador", pins.digital_read_pin(DigitalPin.P0))
    if input.temperature() <= TargetTemp:
        pins.digital_write_pin(DigitalPin.P0, 1)
        pins.digital_write_pin(DigitalPin.P1, 1)
    if input.temperature() > TargetTemp:
        pins.digital_write_pin(DigitalPin.P0, 0)
        pins.digital_write_pin(DigitalPin.P1, 0)
    if realtemp < mintemp:
        mintemp = realtemp
    if realtemp > maxtemp:
        maxtemp = realtemp
    basic.pause(5000)
    basic.show_leds("""
        . # # . .
        . # # . .
        # # # # .
        # # # # .
        . # # . .
        """)
    basic.show_number(input.temperature())
basic.forever(on_forever)
