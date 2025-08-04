mode = 'add'

beforeCanvas(`
<select onchange="mode = event.target.value">
  <option>add</option>
  <option>subtract</option>
</select>
`)

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

lines = []

function setup() {
  createCanvas(640, 640)
  textAlign(CENTER)
  textSize(14)

  black()
}

function mousePressed() {
  if (lines.length == 0) {
    lines.push([width / 2, height / 2, mouseX, mouseY])
  } else if (lines.length == 1) {
    lines.push([lines[0][2], lines[0][3], mouseX, mouseY])
  } else {
    lines = []
  }
}

function black() {
  stroke(0)
  fill(0)
}

function gray() {
  stroke(200)
  fill(200)
}

function dash(on) {
  if (on) {
    drawingContext.setLineDash([5, 5])
  } else {
    drawingContext.setLineDash([])
  }
}

function draw() {
  background(255)

  if (lines.length === 0) {
    text('Draw first vector', width / 2, 15)
    vector(width / 2, height / 2, mouseX, mouseY)
  } else if (lines.length === 1) {
    text('Draw second vector', width / 2, 15)
    gray()
    vector.apply(null, lines[0])
    black()
    vector(lines[0][2], lines[0][3], mouseX, mouseY)
  } else {
    text(`Your two vectors ${mode === 'add' ? 'added' : 'subtracted'}`, width / 2, 15)
    gray()
    vector.apply(null, lines[0])
    vector.apply(null, lines[1])
    if (mode === 'subtract') {
      dash(true)
      vector(lines[1][0], lines[1][1], 2 * lines[1][0] - lines[1][2], 2 * lines[1][1] - lines[1][3])
      dash(false)
    }

    black()
    push()
    translate(width / 2, height / 2)
    const v1 = createVector(lines[0][2] - width / 2, lines[0][3] - height / 2)
    const v2 = createVector(lines[1][2] - lines[1][0], lines[1][3] - lines[1][1])
    const v3 = mode === 'add' ?  p5.Vector.add(v1, v2) : p5.Vector.sub(v1, v2)
    vector(0, 0, v3.x, v3.y)
    pop()
  }
}
