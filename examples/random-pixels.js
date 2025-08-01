mode = 'random'

function totallyRandom() {
  loadPixels()
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let i = (x + y * width) * 4

      const bright = random(255)

      pixels[i] = bright
      pixels[i+1] = bright
      pixels[i+2] = bright
      pixels[i+3] = 255
    }
  }
  updatePixels()

  noLoop()
}

function perlinBigOffset() {
  loadPixels()
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let i = (x + y * width) * 4

      const bright = map(noise(x, y), 0, 1, 0, 255)

      pixels[i] = bright
      pixels[i+1] = bright
      pixels[i+2] = bright
      pixels[i+3] = 255
    }
  }
  updatePixels()
}

function perlin() {
  loadPixels()
  for (let x = 0, xoff = 0; x < width; x++, xoff += 0.01) {
    for (let y = 0, yoff = 0; y < height; y++, yoff += 0.01) {
      let i = (x + y * width) * 4

      const bright = map(noise(xoff, yoff), 0, 1, 0, 255)

      pixels[i] = bright
      pixels[i+1] = bright
      pixels[i+2] = bright
      pixels[i + 3] = 255
    }
  }
  updatePixels()
}

function setup() {
  createCanvas(640, 240)
  pixelDensity(1)
  noLoop()
}

function draw() {
  console.log(`Drawing in ${mode} mode`)

  switch (mode) {
    case 'random':
      totallyRandom()
      break
    case 'perlinBigOffset':
      perlinBigOffset()
      break
    case 'perlin':
      perlin()
      break
  }
}

function update(newMode) {
  mode = newMode
  redraw()
}

const div = document.createElement('div')
document.querySelector('main').appendChild(div)
div.innerHTML = `
<button onclick="update('random')">Totally random</button>
<button onclick="update('perlinBigOffset')">Perlin big offsets</button>
<button onclick="update('perlin')">Perlin</button>
`
