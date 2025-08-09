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
    this.xoff = 10
    this.yoff = 10001
  }

  reset() {
    this.pos = createVector(width / 2, height / 2)
    this.velocity = createVector(0, 0)
  }

  update() {
    let xAcc, yAcc

    if (mode === 'random') {
      xAcc = random(-0.2, 0.2)
      yAcc = random(-0.2, 0.2)
    } else if (mode === 'perlin') {
      xAcc = map(noise(this.xoff += 0.01), 0, 1, -0.2, 0.2)
      yAcc = map(noise(this.yoff += 0.01), 0, 1, -0.2, 0.2)
    }

    this.velocity.add(xAcc, yAcc)
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

