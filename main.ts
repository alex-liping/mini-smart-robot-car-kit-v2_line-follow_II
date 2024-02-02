function najeti_na_caru () {
    if (kBit.lineSensor(KBitMotorObs.LeftSide) == 0 && kBit.lineSensor(KBitMotorObs.RightSide) == 0) {
        kBit.led(KBitColor.Blue)
        kBit.run(KBitDir.RunForward, 20)
        kBit.ledBrightness(255)
        kBit.led(KBitColor.Red)
    }
    if (kBit.lineSensor(KBitMotorObs.LeftSide) == 1) {
        najel_zleva = 1
        najel_zprava = 0
        kBit.motor(KBitMotorObs.LeftSide, KBitMotorDir.Forward, 0)
        kBit.motor(KBitMotorObs.RightSide, KBitMotorDir.Forward, 30)
        if (kBit.lineSensor(KBitMotorObs.LeftSide) == 1 && kBit.lineSensor(KBitMotorObs.RightSide) == 1) {
            kBit.carStop()
            basic.pause(1000)
        }
    }
    if (kBit.lineSensor(KBitMotorObs.RightSide) == 1) {
        najel_zprava = 1
        najel_zleva = 0
        kBit.motor(KBitMotorObs.RightSide, KBitMotorDir.Forward, 0)
        kBit.motor(KBitMotorObs.LeftSide, KBitMotorDir.Forward, 30)
        if (kBit.lineSensor(KBitMotorObs.LeftSide) == 1 && kBit.lineSensor(KBitMotorObs.RightSide) == 1) {
            kBit.carStop()
            basic.pause(1000)
        }
    }
    prekazka_front()
}
function toceni_LED_zaporny () {
    for (let index = 0; index < 1; index++) {
        od = 18
        _do = 1
        for (let index = 0; index < 18; index++) {
            range = strip.range(od, _do)
            range.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause(10)
            range.showColor(neopixel.colors(NeoPixelColors.Black))
            od += -1
        }
    }
}
function toceni_LED_zaporny_pomaly () {
    for (let index = 0; index < 3; index++) {
        od = 18
        _do = 1
        for (let index = 0; index < 18; index++) {
            range = strip.range(od, _do)
            range.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause(20)
            range.showColor(neopixel.colors(NeoPixelColors.Black))
            od += -1
        }
    }
}
function toceni_LED_kladny_pomaly () {
    for (let index = 0; index < 3; index++) {
        od = 0
        _do = 1
        for (let index = 0; index < 18; index++) {
            range = strip.range(od, _do)
            range.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause(20)
            range.showColor(neopixel.colors(NeoPixelColors.Black))
            od += 1
        }
    }
}
function jed_po_care () {
    if (kBit.lineSensor(KBitMotorObs.LeftSide) == 1 && kBit.lineSensor(KBitMotorObs.RightSide) == 1) {
        range = strip.range(6, 6)
        range.showColor(neopixel.colors(NeoPixelColors.Blue))
        kBit.run(KBitDir.RunForward, 30)
        kBit.ledBrightness(255)
        kBit.led(KBitColor.Green)
    }
    while (kBit.lineSensor(KBitMotorObs.LeftSide) == 0 && kBit.lineSensor(KBitMotorObs.RightSide) == 1) {
        kBit.motor(KBitMotorObs.RightSide, KBitMotorDir.Forward, -10)
        kBit.motor(KBitMotorObs.LeftSide, KBitMotorDir.Forward, 30)
        toceni_LED_zaporny()
    }
    while (kBit.lineSensor(KBitMotorObs.RightSide) == 0 && kBit.lineSensor(KBitMotorObs.LeftSide) == 1) {
        kBit.motor(KBitMotorObs.RightSide, KBitMotorDir.Forward, 30)
        kBit.motor(KBitMotorObs.LeftSide, KBitMotorDir.Forward, -10)
        toceni_LED_kladny()
    }
    prekazka_front()
}
function prekazka_front () {
    if (kBit.ultra() <= 10) {
        kBit.carStop()
        kBit.ledBrightness(255)
        kBit.led(KBitColor.Red)
        basic.pause(1000)
    } else {
        kBit.run(KBitDir.RunForward, 15)
    }
}
function toceni_LED_kladny () {
    for (let index = 0; index < 1; index++) {
        od = 0
        _do = 1
        for (let index = 0; index < 18; index++) {
            range = strip.range(od, _do)
            range.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause(10)
            range.showColor(neopixel.colors(NeoPixelColors.Black))
            od += 1
        }
    }
}
let _do = 0
let od = 0
let najel_zprava = 0
let najel_zleva = 0
let range: neopixel.Strip = null
let strip: neopixel.Strip = null
let left_line = 0
let right_line = 0
strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
basic.showIcon(IconNames.Sad)
strip.showColor(neopixel.colors(NeoPixelColors.Green))
basic.pause(500)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
range = strip.range(1, 1)
basic.pause(200)
toceni_LED_kladny_pomaly()
toceni_LED_zaporny_pomaly()
strip.showColor(neopixel.colors(NeoPixelColors.Green))
basic.pause(500)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
basic.pause(200)
strip.showColor(neopixel.colors(NeoPixelColors.Green))
basic.pause(500)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
najeti_na_caru()
basic.forever(function () {
    jed_po_care()
})
