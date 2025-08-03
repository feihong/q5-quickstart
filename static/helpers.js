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
