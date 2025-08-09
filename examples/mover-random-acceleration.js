globalVars.add('mode', 'radio', {
  label: 'Mode',
  onchange: () => m.reset(),
  choices: [
    { label: 'Random', value: 'random' },
    { label: 'Perlin', value: 'perlin' },
  ]
})

class Mover {
  constructor() {
    this.reset()

    // For perlin noise
    this.magOff = 0
    this.headingOff = 10000
  }

  reset() {
    this.pos = createVector(width / 2, height / 2)
    this.velocity = createVector(0, 0)
  }

  update() {
    let acc

    if (mode === 'random') {
      acc = p5.Vector.random2D()
      acc.mult(random(0.5))
    } else if (mode === 'perlin') {
      const mag = map(noise(this.magOff += 0.01), 0, 1, 0, 0.1)
      const heading = map(noise(this.headingOff += 0.01), 0, 1, 0, 2*PI)
      acc = createVector(mag, 0)
      acc.setHeading(heading)
    }

    this.velocity.add(acc)
    this.velocity.limit(15)
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
    text(floor(this.velocity.mag()), 2, 11)
  }
}

function setup() {
  createCanvas(640, 240)
  m = new Mover()
}

function draw() {
  background(200)
  m.update()
  m.draw()
}

