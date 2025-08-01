class Walker {
    constructor(w, h) {
        this.x = w / 2
        this.y = h / 2
    }

    update() {
        if (random([true, false])) {
            this.x += random([-1, 1])
        } else {
            this.y += random([-1, 1])
        }
    }

    draw() {
        point(this.x, this.y)
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
