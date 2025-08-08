const md = markdownit({
  html: true,
  linkify: true,
})

function afterTitle(markdown) {
  window.addEventListener('load', () => {
    document.querySelector('h1').insertAdjacentHTML('afterend', md.render(markdown))
  })
}

function afterCanvas(markdown) {
  window.addEventListener('load', () => {
    document.querySelector('canvas').insertAdjacentHTML('afterend', md.render(markdown))
  })
}

// Set up drawing library button
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(document.location.search)
  const drawingLibBtn = document.querySelector('button.drawing-lib-button')
  const isQ5 = params.get('q5') === '1'
  drawingLibBtn.textContent = isQ5 ? 'q5' : 'p5'
  drawingLibBtn.onclick = () => document.location.search = `?q5=${!isQ5 + 0}`
})
