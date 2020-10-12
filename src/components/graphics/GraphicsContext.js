import p5 from 'p5';
import PrimeMover from "./PrimeMover";
import {v4 as uuid} from 'uuid'
import SecondaryMoverSystem from "./SecondaryMoverSystem";
import {initializationConstants} from "../util/InitializationConstants";
import {rangeMap} from "../util/Util";

class GraphicsContext {
  constructor() {
    this.myP5 = null;
    this.audioContext = null;
    this.primeMovers = new Map();
    this.secondaryMoverSystems = new Map();
    this.previousPrimeMover = null;
    this.isTouchActivated = false;

    this.moverProperties = {
      animationSpeed: initializationConstants.animationSpeed,
      primeMoverColor: initializationConstants.primeMoverColor,
      secondaryMoverColor: initializationConstants.secondaryMoverColor
    }
    this.shouldDisplayAnimation = initializationConstants.displayAnimation;
    this.shouldDisplaySpectrum = initializationConstants.displaySpectrum;
    this.shouldDisplayInfo = initializationConstants.displayNotes;
  }

  initialize(domReference) {
    this.myP5 = new p5(this.sketch, domReference);
  }

  sketch = (p) => {

    p.setup = () => {
      console.log("Setup");
      p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
      p.clear();
      if (this.shouldDisplayAnimation) {
        this.primeMovers.forEach(primeMover => primeMover.update());
        this.secondaryMoverSystems.forEach(system => system.update());
      }
      if (this.shouldDisplaySpectrum) {
        this.displayWaveform();
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.touchStarted = (event) => {
      if (this.isTouchActivated) {
        return;
      }
      if (event.targetTouches.length === 0) {
        return;
      }
      this.isTouchActivated = true;
      this.handleGenericPressEvent([{
        x: event.targetTouches.item(0).clientX,
        y: event.targetTouches.item(0).clientY
      }]);
      // Handle multiple touches
      /*const coordinates = Array(event.targetTouches.length).fill()
        .flatMap((_, i) => [{x: event.touches.item(i).clientX, y: event.touches.item(i).clientY}])
      this.handleGenericPressEvent(coordinates)*/
    }

    p.mousePressed = (event) => {
      this.handleGenericPressEvent([{x: event.x, y: event.y}]);
    }

    p.touchEnded = (event) => {
      if (event.targetTouches.length !== 0) {
        return;
      }
      this.isTouchActivated = false;
      this.handleGenericReleasedEvent(event);
    }

    p.mouseReleased = () => {
      this.handleGenericReleasedEvent([]);
    }
  }

  handleGenericPressEvent = (coordinates) => {
    if (!this.shouldDisplayAnimation) {
      return;
    }
    coordinates.forEach(coordinate => {
      const primaryMoverId = uuid();
      const primeMover = new PrimeMover(
        primaryMoverId,
        coordinate,
        this.myP5,
        this.previousPrimeMover,
        this.moverProperties
      );
      primeMover.registerDestructionCallback(() => this.handlePrimeMoverDestruction(primeMover));
      this.primeMovers.set(primaryMoverId, primeMover);
      this.previousPrimeMover = primeMover;

      const secondaryMoverSystemId = uuid();
      const secondaryMoverSystem = new SecondaryMoverSystem(
        secondaryMoverSystemId,
        coordinate,
        this.myP5,
        this.moverProperties
      );
      this.secondaryMoverSystems.set(secondaryMoverSystemId, secondaryMoverSystem);
      secondaryMoverSystem.registerDestructionCallback(
        () =>this.handleSecondaryMoverSystemDestruction(secondaryMoverSystem));
    });
  }

  handleGenericReleasedEvent = (_) => {
    if (!this.shouldDisplayAnimation) {
      return;
    }
    this.secondaryMoverSystems.forEach(system => system.initiateDestruction());
  }

  handlePrimeMoverDestruction(primeMover) {
    this.primeMovers.delete(primeMover.id);
    primeMover = null;
  }

  handleSecondaryMoverSystemDestruction(system) {
    this.secondaryMoverSystems.delete(system.id);
    system = null;
  }

  displaySpectrum() {
    const fftBuffer = this.audioContext.getFftBuffer();
    if (fftBuffer === null || fftBuffer.length === 0) {
      return
    }
    const {width, height} = this.myP5;
    const fftSize = fftBuffer.length;
    this.myP5.noStroke();
    this.myP5.fill(255,255,255,40);
    let w = width / fftSize;
    for (let i = 0; i < fftSize; i++) {
      let index = Math.floor(rangeMap(i, 0, fftSize, 0, width));
      this.myP5.rect(index, height - (rangeMap(fftBuffer[i], -120, 0, 0, height)), w, height, 20);
    }
  }

  displayWaveform() {
    const fftBuffer = this.audioContext.getFftBuffer();
    if (fftBuffer === null || fftBuffer.length === 0) {
      return
    }
    const {width, height} = this.myP5;
    const fftSize = fftBuffer.length;
    this.myP5.stroke(255);
    this.myP5.strokeWeight(1);
    this.myP5.beginShape();
    this.myP5.fill(255, 255, 255, 80);
    for (let i = 0; i < fftSize; i++) {
      let index = Math.floor(rangeMap(i, 0, fftSize, 0, width));
      this.myP5.vertex(index, height/2 + (rangeMap(fftBuffer[i], -1, 1, -height, height)));
    }
    this.myP5.endShape();
  }

  setAudioContext(audioContext) {
    this.audioContext = audioContext;
  }

  setDisplayAnimation(value) {
    this.shouldDisplayAnimation = value;
  }

  setDisplaySpectrum(value) {
    this.shouldDisplaySpectrum = value;
  }

  setAnimationSpeed(value) {
    this.moverProperties.animationSpeed = value;
  }
}

export default GraphicsContext;