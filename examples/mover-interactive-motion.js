afterCanvas(`Click on the canvas to reset the mover`)

class Mover {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.velocity = createVector()
  }

  update() {
    const mouse = createVector(mouseX, mouseY)
    const acc = mouse.sub(this.pos)
    acc.setMag(0.01)

    this.velocity.add(acc)
    this.velocity.limit(10)
    this.pos.add(this.velocity)
  }

  draw() {
    circle(this.pos.x, this.pos.y, 10)
    text(floor(this.velocity.mag()), 2, 11)
  }
}

function setup() {
  createCanvas(640, 640)
  m = new Mover()
}

function draw() {
  background(200)
  m.update()
  m.draw()
}

function mousePressed(event) {
  if (event.target.tagName === 'CANVAS') {
    m.pos = createVector(mouseX, mouseY)
    m.velocity = createVector()
  }
}
