def on_button_pressed_a():
    global TargetTemp
    TargetTemp += 0 - 1
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
        . # # # .
        # . . . #
        # . . . #
        . # # # .
        . # # # .
        """)
    basic.show_number(TargetTemp)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_button_pressed_b():
    global TargetTemp
    TargetTemp += 0 + 1
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        . # . # .
        . # # # .
        """)
    basic.show_number(TargetTemp)
input.on_button_pressed(Button.B, on_button_pressed_b)

TargetTemp = 0
TargetTemp = 22

def on_forever():
    basic.show_leds("""
        . # # . .
        . # # . .
        # # # # .
        # # # # .
        . # # . .
        """)
    serial.write_value("temperatura", input.temperature())
    serial.write_value("Calentador", pins.digital_read_pin(DigitalPin.P0))
    basic.show_number(input.temperature())
    if input.temperature() <= TargetTemp:
        basic.show_leds("""
            . # # # .
            # # # # #
            # # # # #
            . # # # .
            . # # # .
            """)
        pins.digital_write_pin(DigitalPin.P0, 1)
        pins.digital_write_pin(DigitalPin.P1, 1)
    if input.temperature() > TargetTemp:
        pins.digital_write_pin(DigitalPin.P0, 0)
        pins.digital_write_pin(DigitalPin.P1, 0)
basic.forever(on_forever)
