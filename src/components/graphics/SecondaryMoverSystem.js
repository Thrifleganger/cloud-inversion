import {v4 as uuid} from 'uuid'

class SecondaryMoverSystem {

  constructor(id, coordinates, p5, properties) {
    this.p5 = p5;
    this.id = id;
    this.coordinates = coordinates;
    this.secondaryMovers = new Map();
    this.destroyCallback = null;
    this.destructionInitiated = false;

    this.intervalId = setInterval(() => {
      const moverId = uuid();
      this.secondaryMovers.set(moverId, new SecondaryMover(
        moverId,
        coordinates.x,
        p5,
        properties.animationSpeed,
        properties.secondaryMoverColor,
        (mover) => this.deleteMover(mover)));
    }, Number.parseInt(p5.random(30, 150)));
  }

  update() {
    if (this.secondaryMovers.length === 0 && this.destructionInitiated) {
      this.destroyCallback();
    }
    this.secondaryMovers.forEach(mover => mover.update());
  }

  deleteMover(mover) {
    this.secondaryMovers.delete(mover.id);
    mover = null;
  }

  registerDestructionCallback(destroyCallback) {
    this.destroyCallback = destroyCallback;
  }

  initiateDestruction() {
    clearInterval(this.intervalId);
    this.destructionInitiated = true;
  }
}

export default SecondaryMoverSystem;

class SecondaryMover {

  constructor(id, x, p5, speed, color, deleteCallback) {
    this.id = id;
    this.p5 = p5;
    this.deleteCallback = deleteCallback;
    let initialSpeed = - speed * p5.random(2,4);
    this.size = p5.random(p5.width * 0.01, p5.width * 0.05);
    this.location = p5.createVector(p5.random(x - (p5.width * 0.0625), x + (p5.width * 0.0625)), p5.height + 20)
    this.velocity = p5.createVector(0, initialSpeed);
    this.color = color;
    this.alpha = Number.parseInt(p5.random(50, 200));
  }

  update() {
    this.location.add(this.velocity);
    if (this.isOutOfCanvas()) {
      this.deleteCallback(this);
    } else {
      this.display();
    }
  }

  isOutOfCanvas() {
    return this.location.y < 0;
  }

  display() {
    this.p5.noStroke();
    this.p5.fill(this.p5.color(
      this.p5.red(this.color),
      this.p5.green(this.color),
      this.p5.blue(this.color),
      this.alpha)
    );
    this.p5.ellipse(this.location.x, this.location.y, this.size, this.size);
  }
}