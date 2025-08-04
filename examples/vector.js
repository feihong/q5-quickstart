beforeCanvas(`
Show how to draw a vector with an arrow drawn at its head
`)

function setup() {
  createCanvas(640, 240)
}

function vector(x1, y1, x2, y2) {
  const mag = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  const heading = createVector(x2 - x1, y2 - y1).heading()

  push()
  translate(x1, y1)
  rotate(heading)
  line(0, 0, mag, 0)
  // draw arrow
  beginShape()
  vertex(mag, 0)
  vertex(mag - 7, 3)
  vertex(mag - 7, -3)
  endShape(CLOSE)
  pop()
}

function draw() {
  background(255)
  stroke(50)
  fill(0)
  vector(width / 2, height / 2, mouseX, mouseY)
}
