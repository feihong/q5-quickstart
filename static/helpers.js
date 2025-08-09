const md = markdownit({
  html: true,
  linkify: true,
})

function afterTitle(markdown) {
  document.querySelector('h1').insertAdjacentHTML('afterend', md.render(markdown))
}

function afterCanvas(markdown) {
  document.querySelector('canvas').insertAdjacentHTML('afterend', md.render(markdown))
}

// Set up drawing library button
const params = new URLSearchParams(document.location.search)
const drawingLibBtn = document.querySelector('button.drawing-lib-button')
const isQ5 = params.get('q5') === '1'
drawingLibBtn.textContent = isQ5 ? 'q5' : 'p5'
drawingLibBtn.onclick = () => document.location.search = `?q5=${!isQ5 + 0}`

// Global vars widgets

const { 'sl-radio-group': radioGroup, 'sl-radio': radio, 'sl-range': range } = van.tags

function Radio(name, { label, callback, choices }) {
  const rg = radioGroup({label, name, value: choices[0].value},
    choices.map(choice => radio({value: choice.value}, choice.label))
  )
  rg.addEventListener('sl-change', event => {
    window[name] = event.target.value
    if (callback) callback(window[name])
  })
  return rg
}

function Slider(name, { label, value, min, max, step }) {
  const slider = range({ label, value, min, max, step })
  slider.addEventListener('sl-input', event => {
    window[name] = event.target.value
  })
  return slider
}

globalVarsDiv = document.getElementById('global-vars-container')

globalVars = {
  add: (name, type, opts) => {
    if (type === 'radio') {
      window[name] = opts.choices[0].value
      van.add(globalVarsDiv, Radio(name, opts))
    } else if (type === 'slider') {
      window[name] = opts.value
      van.add(globalVarsDiv, Slider(name, opts))
    }
  }
}
