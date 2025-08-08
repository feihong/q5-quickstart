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

const { fieldSet, legend, div, input, label: label_ } = van.tags

function Radio(name, { label, callback, choices }) {
  return fieldSet([
    legend(label),

    ...choices.map(choice => {
      const id = `global-${name}-${choice.value}`
      const onclick = () => {
        window[name] = choice.value
        if (callback) callback(choice.value)
      }
      return div(
        input({ id, type: 'radio', name, value: choice.value, checked: choice.value === window[name], onclick }),
        label_({ for: id }, choice.label),
      )
    })
  ])
}

globalVarsDiv = document.getElementById('global-vars-container')

globalVars = {
  add: (name, type, opts) => {
    if (type === 'radio') {
      window[name] = opts.choices[0].value

      const div = document.createElement('div')
      globalVarsDiv.appendChild(div)
      van.add(div, Radio(name, opts))
    }
  }
}
