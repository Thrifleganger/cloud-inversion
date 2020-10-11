import Patch from "./AudioPatch";
import {Synth} from 'tone'
import {convertXToFrequency, convertYToVelocity} from "../util/Util";

class SimpleSynth {
  constructor() {
    this.patch = new Patch()
  }

  initialize() {
    this.patch.synth = new Synth({
      oscillator: {
        type: "sine"
      }
    });
  }

  triggerAttack(coordinates, currentOctave) {
    const {synth} = this.patch;
    synth.triggerAttack(
      convertXToFrequency(coordinates[0].x, currentOctave),
      convertYToVelocity(coordinates[0].y));
  }

  triggerRelease() {
    const {synth} = this.patch;
    synth.triggerRelease();
  }

  setEnvelope(attack, decay, sustain, release) {
    const {envelope:env} = this.patch.synth;
    env.attack = attack;
    env.decay = decay;
    env.sustain = sustain;
    env.release = release;
  }
}

export default SimpleSynth;