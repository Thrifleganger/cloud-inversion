export const initializationConstants = {
  animationSpeed: 1,
  primeMoverColor: "#ffffff",
  secondaryMoverColor: "#ffffff",
  accentColor: "",
  startingOctave: 3,
  currentPatch: 0,
  displayAnimation: true,
  displayWaveform: true,
  displayNotes: false,
  arpeggiatorSemitones: [0,2,7,11]
};

let colourPaletteOpacity = 0.7;
let colourPalettes = [
  [`rgba(226,178,207,${colourPaletteOpacity})`, `rgba(203,129,174,${colourPaletteOpacity})`, `rgba(173,83,138,${colourPaletteOpacity})`, `rgba(111,20,75,${colourPaletteOpacity})`]
];

class SliderModel {
  constructor(id, parameter, defaultValue, minValue, maxValue, step) {
    this.id = id;
    this.parameter = parameter;
    this.defaultValue = defaultValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
  }
}

export const sliderModels = new Map();
sliderModels.set("volume-slider", new SliderModel(
  "volume-slider",
  "Volume",
  0.7,
  0,
  1,
  0.01
));
sliderModels.set("pan-slider", new SliderModel(
  "pan-slider",
  "Pan",
  0,
  -1.0,
  1.0,
  0.01
));
sliderModels.set("variance-slider", new SliderModel(
    "variance-slider",
    "Variance",
    1,
    0,
    1,
    0.01
))
sliderModels.set("attack-slider", new SliderModel(
  "attack-slider",
  "Attack",
  0.1,
  0.01,
  1,
  0.01
));
sliderModels.set("decay-slider", new SliderModel(
  "decay-slider",
  "Decay",
  0.1,
  0.01,
  1,
  0.01
));
sliderModels.set("sustain-slider", new SliderModel(
  "sustain-slider",
  "Sustain",
  0.8,
  0.01,
  1,
  0.01
));
sliderModels.set("release-slider", new SliderModel(
  "release-slider",
  "Release",
  1,
  0.01,
  3,
  0.01
));
sliderModels.set("mod-index-slider", new SliderModel(
  "mod-index-slider",
  "modIndex",
  5,
  0,
  10,
  0.01
));
sliderModels.set("mod-ratio-slider", new SliderModel(
  "mod-ratio-slider",
  "modRatio",
  2,
  0,
  5,
  0.01
));
sliderModels.set("mod-duration-slider", new SliderModel(
  "mod-duration-slider",
  "modDuration",
  1,
  0,
  3,
  0.01
));
sliderModels.set("delay-time-slider", new SliderModel(
  "delay-time-slider",
  "Delay time",
  1,
  0,
  4,
  0.01
));
sliderModels.set("delay-feedback-slider", new SliderModel(
  "delay-feedback-slider",
  "Feedback",
  0.3,
  0,
  0.99,
  0.01
));
sliderModels.set("delay-mix-slider", new SliderModel(
  "delay-mix-slider",
  "Delay mix",
  0.15,
  0,
  1,
  0.01
));
sliderModels.set("reverb-mix-slider", new SliderModel(
  "reverb-mix-slider",
  "Reverb mix",
  0.8,
  0,
  1,
  0.01
));
sliderModels.set("arpeggiator-speed-slider", new SliderModel(
  "arpeggiator-speed-slider",
  "Speed",
  1.25,
  0.5,
  2,
  0.01
));
sliderModels.set("arpeggiator-octave-slider", new SliderModel(
  "arpeggiator-octave-slider",
  "Octaves",
  3,
  1,
  3,
  1
));
