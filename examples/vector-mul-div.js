globalVars.add('scalar', 'slider', {
  label: 'Scalar',
  value: 2,
  min: 1,
  max: 20,
  step: 0.5,
})

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

activeLine = null

function sf(v) {
  stroke(v)
  fill(v)
}

function setup() {
  createCanvas(640, 640)
  sf(0)
}

function mousePressed(event) {
  if (event.target.tagName !== 'CANVAS') {
    return
  }

  if (activeLine === null) {
    activeLine = [width / 2, height / 2, mouseX, mouseY]
  } else {
    activeLine = null
  }
}

function draw() {
  background(255)

  if (activeLine === null) {
    vector(width / 2, height / 2, mouseX, mouseY)
  } else {
    push()
    translate(width / 2, height / 2)

    const v = createVector(activeLine[2] - width / 2, activeLine[3] - height / 2)
    const multV = p5.Vector.mult(v, scalar)
    const divV = p5.Vector.div(v, scalar)

    sf('red')
    vector(0, 0, multV.x, multV.y)
    sf(0)
    vector(0, 0, v.x, v.y)
    sf('blue')
    vector(0, 0, divV.x, divV.y)
    pop()
  }
}
