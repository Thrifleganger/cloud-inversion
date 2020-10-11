import {Midi} from "tone";

export const rangeMap = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

export const convertXToFrequency = (x, currentOctave, isFullScale = false) => {
  return Midi(Math.floor(convertXToNoteNumber(x, currentOctave))).toFrequency();
}

export const convertXToNoteNumber = (x, currentOctave, isFullScale = false) => {
  return Math.floor(currentOctave * 12 + 12 + rangeMap(x, 0, window.innerWidth, 0, 12));
}

export const convertYToVelocity = (y) => {
  return rangeMap(y, 0, window.innerHeight, 0, 1);
}