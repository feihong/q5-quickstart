globalVars.add('xAcc', 'slider', {
  label: 'Horizontal acceleration',
  value: 0,
  min: -1,
  max: 1,
  step: 0.001,
})
globalVars.add('yAcc', 'slider', {
  label: 'Vertical acceleration',
  value: 0,
  min: -1,
  max: 1,
  step: 0.001,
})
globalVars.add('vLimit', 'slider', {
  label: 'Velocity limit',
  value: 50,
  min: 0,
  max: 100,
  step: 1,
})

class Mover {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.velocity = createVector(0, 0)
  }

  update() {
    this.velocity.limit(vLimit)
    this.velocity.add(xAcc, yAcc)
    this.pos.add(this.velocity)

    if (this.pos.x < 0) {
      this.pos.x = width
    } else if (this.pos.x > width) {
      this.pos.x = 0
    }

    if (this.pos.y < 0) {
      this.pos.y = height
    } else if (this.pos.y > height) {
      this.pos.y = 0
    }
  }

  draw() {
    circle(this.pos.x, this.pos.y, 10)
  }
}

function setup() {
  createCanvas(640, 240)
  w = new Mover()
}

function draw() {
  background(255)
  w.update()
  w.draw()
}
