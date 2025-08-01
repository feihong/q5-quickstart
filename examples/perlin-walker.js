class Walker {
  constructor(w, h) {
    this.tx = 0
    this.ty = 10000
  }

  update() {
    this.x = map(noise(this.tx), 0, 1, 0, width)
    this.y = map(noise(this.ty), 0, 1, 0, height)

    this.tx += 0.01
    this.ty += 0.01
  }

  draw() {
    circle(this.x, this.y, 10)
  }
}

function setup() {
  createCanvas(640, 240)
  background(220)

  w = new Walker(width, height)
}

function draw() {
  w.update()
  w.draw()
}
