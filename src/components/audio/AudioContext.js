import {Analyser, Channel, Destination, Filter, Gain, LFO, Panner, PingPongDelay, Reverb, start} from 'tone'
import {rangeMap} from "../util/Util";
import {sliderModels, initializationConstants} from "../util/InitializationConstants";

class AudioContext {

  constructor() {
    this.instrument = null;
    this.fftAnalyzerCallbackInterval = null;
    this.fftAnalysisArray = [];

    this.volume = sliderModels.get("volume-slider").defaultValue;
    this.pan = sliderModels.get("pan-slider").defaultValue;
    this.variance = sliderModels.get("variance-slider").defaultValue;

    this.attack = sliderModels.get("attack-slider").defaultValue;
    this.decay = sliderModels.get("decay-slider").defaultValue;
    this.sustain = sliderModels.get("sustain-slider").defaultValue;
    this.release = sliderModels.get("release-slider").defaultValue;

    this.delayTime = sliderModels.get("delay-time-slider").defaultValue;
    this.delayFeedback = sliderModels.get("delay-feedback-slider").defaultValue;
    this.delayMix = sliderModels.get("delay-mix-slider").defaultValue;
    this.reverbMix = sliderModels.get("reverb-mix-slider").defaultValue;

    this.arpeggiatorSpeed = sliderModels.get("arpeggiator-speed-slider").defaultValue;
    this.arpeggiatorOctaves = sliderModels.get("arpeggiator-octave-slider").defaultValue;
    this.arpeggiatorSemitones = initializationConstants.arpeggiatorSemitones;

    this.currentOctave = initializationConstants.startingOctave;
  }

  start() {
    console.log("Started audio context");
    start().then();
  }

  initialize(instrument) {
    console.log("Initializing audioContext");
    this.instrument = instrument;
    this.instrument.initialize(this);
    const {patch} = this.instrument;
    patch.fftAnalyzer = new Analyser({
      size: 256,
      type: "waveform",
      smoothing: 0.9
    });

    patch.volume = new Gain(this.volume, "normalRange");
    patch.pan = new Panner(this.pan);
    patch.tone = new Filter({
      type: "lowpass",
      frequency: 100
    });
    patch.lfo = new LFO(0.1, 300, 10000)
    patch.lfo.start();

    patch.delay = new PingPongDelay({
      delayTime: this.delayTime,
      maxDelayTime: 4
    });
    this.setDelayFeedback(this.delayFeedback)
    this.setDelayMix(this.delayMix);
    patch.reverb = new Reverb(10);
    this.setReverbMix(this.reverbMix);

    patch.mainChannel = new Channel();
    patch.reverbChannel = new Channel();
    patch.delayChannel = new Channel();
    patch.synth.connect(patch.volume);
    patch.volume.connect(patch.pan);
    patch.pan.connect(patch.tone);
    patch.lfo.connect(patch.tone.frequency);
    patch.tone.connect(patch.mainChannel);
    patch.mainChannel.send("delay-bus", -3);
    patch.mainChannel.send("reverb-bus", -3);
    patch.delayChannel.receive("delay-bus");
    patch.reverbChannel.receive("reverb-bus");
    patch.delayChannel.connect(patch.delay);
    patch.reverbChannel.connect(patch.reverb);
    const finalOutputNode = new Gain(1, "normalRange");
    patch.delay.connect(finalOutputNode);
    patch.reverb.connect(finalOutputNode);

    finalOutputNode.fan(Destination);
    finalOutputNode.fan(patch.fftAnalyzer);

    if (initializationConstants.displaySpectrum) {
      this.fftAnalyzerCallbackInterval = setInterval(
        () => this.fftAnalysisArray = patch.fftAnalyzer.getValue(), 30);
    }
  }

  handleGenericTriggerEvent = (coordinates) => {
    this.instrument.triggerAttack(coordinates, this.currentOctave);
  }

  handleGenericReleaseEvent = (_) => {
    this.instrument.triggerRelease();
  }

  setVolume(volume) {
    this.volume = volume;
    this.instrument.patch.volume.gain.value = volume;
  }
  setPan(pan) {
    this.pan = pan;
    this.instrument.patch.pan.pan.value = this.pan;
  }
  setVariance(variance) {
    this.variance = variance;
    this.instrument.patch.lfo.min = rangeMap(this.variance, 0, 1, 2000, 300);
    this.instrument.patch.lfo.max = rangeMap(this.variance, 0, 1, 2000, 10000);
  }

  setAttack(attack) {
    this.attack = attack;
    this.instrument.setEnvelope(this.attack, this.decay, this.sustain, this.release);
  }
  setDecay(decay) {
    this.decay = decay;
    this.instrument.setEnvelope(this.attack, this.decay, this.sustain, this.release);
  }
  setSustain(sustain) {
    this.sustain = sustain;
    this.instrument.setEnvelope(this.attack, this.decay, this.sustain, this.release);
  }
  setRelease(release) {
    this.release = release;
    this.instrument.setEnvelope(this.attack, this.decay, this.sustain, this.release);
  }

  setDelayTime(delayTime) {
    this.delayTime = delayTime;
    this.instrument.patch.delay.delayTime.value = this.delayTime;
  }
  setDelayFeedback(feedback) {
    this.delayFeedback = feedback;
    this.instrument.patch.delay.feedback.value = this.delayFeedback;
  }
  setDelayMix(mix) {
    this.delayMix = mix;
    this.instrument.patch.delay.wet.value = this.delayMix;
  }
  setReverbMix(mix) {
    this.reverbMix = mix;
    this.instrument.patch.reverb.wet.value = this.reverbMix;
  }

  setArpeggiatorSpeed(speed) {
    this.arpeggiatorSpeed = speed;
    if (this.instrument.id === "arpeggiator") {
      this.instrument.setPlaybackRate(speed);
    }
  }
  setArpeggiatorOctaves(octaves) {
    this.arpeggiatorOctaves = octaves;
    if (this.instrument.id === "arpeggiator") {
      this.instrument.setOctaves(octaves);
    }
  }
  setArpeggiatorSemitones(semitonesArray) {
    this.arpeggiatorSemitones = semitonesArray;
    if (this.instrument.id === "arpeggiator") {
      this.instrument.setArpeggiatorSemitones(semitonesArray);
    }
  }

  setCurrentOctave(currentOctave) {
    this.currentOctave = currentOctave;
  }

  setDisplaySpectrum(value) {
    if (value === false && this.fftAnalyzerCallbackInterval !== null) {
      clearInterval(this.fftAnalyzerCallbackInterval);
    } else {
      this.fftAnalyzerCallbackInterval = setInterval(
        () => this.fftAnalysisArray = this.instrument.patch.fftAnalyzer.getValue(), 60);
    }
  }

  getFftBuffer() {
    return this.fftAnalysisArray;
  }

}

export default AudioContext;