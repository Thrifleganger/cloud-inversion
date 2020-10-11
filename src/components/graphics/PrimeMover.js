class PrimeMover {

  constructor(id, coordinates, p5, previousMover, properties) {
    this.p5 = p5;
    this.id = id;
    this.location = p5.createVector(coordinates.x, coordinates.y);
    this.velocity = p5.createVector(0, - properties.animationSpeed);
    this.connectionThreshold = p5.height/2;
    this.previousMover = previousMover;
    this.properties = properties;
  }

  update() {
    this.location.add(this.velocity);
    if (this.isOutOfCanvas()) {
      this.destroyCallback();
    } else {
      this.display();
      this.drawConnection()
    }
  }

  isOutOfCanvas() {
    return this.location.y < 0;
  }

  display() {
    this.p5.noStroke();
    this.p5.fill(this.properties.primeMoverColor);
    const {height} = this.p5;
    const size = this.p5.map(this.location.y, 0, height, 10, 50);
    this.p5.ellipse(this.location.x, this.location.y, size, size);
  }

  registerDestructionCallback(destroyCallback) {
    this.destroyCallback = destroyCallback;
  }

  drawConnection() {
    if (this.previousMover == null) {
      return;
    }
    const {x:prevX, y:prevY} = this.previousMover.location
    if (Math.abs(this.location.y - prevY) > this.connectionThreshold) {
      this.previousMover = null;
      return;
    }
    this.p5.stroke(this.properties.primeMoverColor);
    this.p5.noFill();
    this.p5.strokeWeight(1.5);
    let diffX = (this.location.x - prevX)/2;
    let diffY = (this.location.y - prevY)/2;
    if(diffY < 50) diffY = this.p5.random(-50, 50);
    if(diffX < 50) diffX = this.p5.random(-50, 50);
    this.p5.bezier(
      this.location.x, this.location.y,
      this.location.x - this.p5.random(0,diffX), this.location.y - this.p5.random(0,diffY),
      prevX + this.p5.random(0,diffX), prevY + this.p5.random(0,diffY),
      prevX, prevY);
  }
}

export default PrimeMover;