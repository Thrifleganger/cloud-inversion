import Patch from "./AudioPatch";
import {Synth, Pattern, Midi, Transport} from 'tone'
import {convertXToNoteNumber, convertYToVelocity} from "../util/Util";

class Arpeggiator {
  constructor() {
    this.id = "arpeggiator";
    this.patch = new Patch();
    this.numberOfOctaves = null;
    this.playbackRate = null;
    this.semitones = null;
    this.audioContext = null;
  }

  initialize(audioContext) {
    console.log("Initializing argpeggiator");
    this.audioContext = audioContext;
    this.patch.synth = new Synth({
      oscillator: {
        type: "sawtooth"
      }
    });
    this.patch.pattern = new Pattern({
      pattern: "upDown"
    });
    this.patch.pattern.interval = "16n";
    this.setEnvelope(audioContext.attack, audioContext.decay, audioContext.sustain, audioContext.release);
    this.playbackRate = audioContext.arpeggiatorSpeed;
    this.numberOfOctaves = audioContext.arpeggiatorOctaves;
    this.semitones = audioContext.arpeggiatorSemitones;
  }

  triggerAttack(coordinates, currentOctave) {
    Transport.start();
    const {pattern, synth} = this.patch;
    let notes = [];
    for (let i of Array(Math.round(this.numberOfOctaves)).keys()) {
      notes = notes.concat(this.semitones.map(note => note + (i * 12)));
    }
    const velocity = convertYToVelocity(coordinates[0].y, currentOctave);
    pattern.callback = (time, note) => synth.triggerAttackRelease(note, "16n", undefined, velocity);
    const midiNoteNumber = convertXToNoteNumber(coordinates[0].x, currentOctave);
    pattern.values = notes.map(note => Math.floor(Midi(note + midiNoteNumber).toFrequency()));
    pattern.playbackRate = this.playbackRate;
    pattern.start();
  }

  triggerRelease(coordinates) {
    this.patch.pattern.stop();
    Transport.stop();
  }

  setArpeggiatorSemitones(array) {
    this.semitones = [...array];
  }

  setOctaves(octaves) {
    this.numberOfOctaves = octaves;
  }

  setPlaybackRate(speed) {
    this.playbackRate = speed;
    this.patch.pattern.playbackRate = speed;
  }

  setEnvelope(attack, decay, sustain, release) {
    const {envelope:env} = this.patch.synth;
    env.attack = attack
    env.decay = decay;
    env.sustain = sustain;
    env.release = release;
  }
}

export default Arpeggiator;
