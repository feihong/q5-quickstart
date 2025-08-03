const md = markdownit({
  html: true,
  linkify: true,
})

function makeDiv(markdown) {
  const result = document.createElement('div')
  result.innerHTML = md.render(markdown)
  return result
}

function beforeCanvas(markdown) {
  window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas')
    const parent = canvas.parentNode
    parent.insertBefore(makeDiv(markdown), canvas)
  })
}

function afterCanvas(markdown) {
  window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas')
    const parent = canvas.parentNode
    parent.insertBefore(makeDiv(markdown), canvas.nextSibling)
  })
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(document.location.search)
  const drawingLibBtn = document.querySelector('button.drawing-lib-button')
  const isQ5 = params.get('q5') === '1'
  drawingLibBtn.textContent = isQ5 ? 'q5' : 'p5'
  drawingLibBtn.onclick = () => document.location.search = `?q5=${!isQ5 + 0}`
})
