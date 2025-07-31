class Walker {
    constructor(w, h) {
        this.x = w / 2
        this.y = h / 2
    }

    update() {
        this.x += random([-1, 1])
        this.y += random([-1, 1])
    }

    draw() {
        point(this.x, this.y)
    }
}

function setup() {
    const canvas = createCanvas(600, 400)
    background(220)

    w = new Walker(width, height)
}

function draw() {
    w.update()
    w.draw()
}
