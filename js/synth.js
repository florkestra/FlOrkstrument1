var flock = flock || require("../../nodejs/node_modules/flocking"),
    example = example || {};

(function () {
    "use strict";

    example.synth = flock.synth({
        synthDef: {
            id: "granny",
            ugen: "flock.ugen.granulator",
            numGrains: {
                ugen: "flock.ugen.line",
                start: 1,
                end: 40,
                duration: 20
            },
            grainDur: {
                ugen: "flock.ugen.line",
                start: 0.1,
                end: 0.005,
                duration: 100
            },
            delayDur: 8,
            mul: 0.5,
            source: {
                ugen: "flock.ugen.filter.biquad.lp",
                freq: {
                    ugen: "flock.ugen.sin",
                    rate: "control",
                    freq: {
                        ugen: "flock.ugen.xLine",
                        rate: "control",
                        start: 0.7,
                        end: 3000,
                        duration: 60
                    },
                    phase: 0,
                    mul: 2000,
                    add: 4000
                },
                source: {
                    ugen: "flock.ugen.lfSaw",
                    freq: {
                        ugen: "flock.ugen.sin",
                        freq: 0.1,
                        mul: 1000,
                        add: 3000,
                    },
                    mul: 0.25
                }
            }
        }
    });

    /*
    var freqTransform = function (value) {
        return (value * 6000) + 60;
    };

    var identityTransform = function (value) {
        return value;
    };

    var carrierSpec = {
        freq: {
            inputPath: "carrier.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "carrier.mul",
            transform: identityTransform
        }
    };

    var modulatorSpec = {
        freq: {
            inputPath: "modulator.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "modulator.mul",
            transform: freqTransform
        }
    };

    example.synthValueMap = {
        "/knobs/0": carrierSpec.freq,
        "/fader1/out": carrierSpec.freq,

        "/knobs/1": carrierSpec.mul,
        "/fader2/out": carrierSpec.mul,

        "/knobs/2": modulatorSpec.freq,
        "/fader3/out": modulatorSpec.freq,

        "/knobs/3": modulatorSpec.mul,
        "/fader4/out": modulatorSpec.mul
    };

    example.mapOSCToSynth = function (oscMessage, synth, valueMap) {
        var address = oscMessage.address;
        var value = oscMessage.args[0];
        var transformSpec = valueMap[address];

        if (transformSpec) {
            var transformed = transformSpec.transform(value);
            synth.set(transformSpec.inputPath, transformed);
        }
    };
    */
        // If we're in a require-compatible environment, export ourselves.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = example;
    }

    flock.init();
    example.synth.play();

}());
