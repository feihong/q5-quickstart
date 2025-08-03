import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/examples/*', serveStatic({ root: './' }))

const examples = [
  {
    path: 'walker',
    title: 'Random walker',
  },
  {
    path: 'perlin-walker',
    title: 'Perlin noise random walker',
  },
  {
    path: 'random-pixels',
    title: 'Each pixel is a random grayscale value',
  },
  {
    path: 'vector',
    title: 'Draw a vector',
  },
]

app.get('/', async (c) => {
  return c.html(
    <html>
      <meta>
        <title>q5.js Quickstart</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </meta>
      <body>
        <main>
          <h1>q5.js Examples</h1>
          <ol>
            {examples.map(e => <li> <a href={`/e/${e.path}`}> {e.title} </a> </li>)}
          </ol>
        </main>
      </body>
    </html>)
})

const dependencyMap: Record<string, string> = {
  learn: 'https://cdn.jsdelivr.net/gh/StriveMath/p5.learn.js/src/p5.learn.js',
}

app.get('/e/:path', async (c) => {
  const q5 = c.req.query('q5')
  const drawingLib = q5 === '1' ? 'https://q5js.org/q5.js' : 'https://cdn.jsdelivr.net/npm/p5/lib/p5.min.js'

  const results = examples.filter(e => e.path === c.req.param('path'))
  const e = results[0] || { path: '', title: 'Not found' }
  const deps = (e.deps || 'p5').split(' ').map(d => dependencyMap[d] || '')

  return c.html(
    <html>
      <meta>
        <title> {e.title} </title>
        <link rel="stylesheet" href="/static/styles.css" />
        <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js" />
        <script src="/static/helpers.js" />
        <script src={drawingLib} />
        {deps.map(src => <script src={src} />)}
      </meta>
      <body>
        <main>
          <button class="drawing-lib-button">-</button>
          <h1> {e.title} </h1>
          <script src={`/examples/${e.path}.js`}></script>
        </main>
      </body>
    </html>)
})

export default {
  port: 8000,
  fetch: app.fetch,
}
