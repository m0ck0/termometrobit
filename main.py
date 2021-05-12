bluetooth.start_uart_service()
realtemp = input.temperature()
TargetTemp = 22
mintemp = realtemp
maxtemp = realtemp

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

def on_forever():
    global realtemp, mintemp, maxtemp
    realtemp = input.temperature()
    bluetooth.uart_write_value("real temp", realtemp)
    bluetooth.uart_write_value("min", mintemp)
    bluetooth.uart_write_value("max", maxtemp)
    bluetooth.uart_write_value("calentador", TargetTemp)
    bluetooth.uart_write_line("----------------------------")
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
    basic.pause(3000)
    basic.show_leds("""
        . # # . .
        . # # . .
        # # # # .
        # # # # .
        . # # . .
        """)
    basic.show_number(input.temperature())

input.on_gesture(Gesture.SHAKE, on_gesture_shake)
input.on_button_pressed(Button.B, on_button_pressed_b)
input.on_button_pressed(Button.A, on_button_pressed_a)

basic.forever(on_forever)
