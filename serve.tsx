import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { jsxRenderer } from 'hono/jsx-renderer'

const app = new Hono()

// Add this middleware so that <!DOCTYPE html> appears at the top of each page
app.get('*', jsxRenderer(({ children }) => children))

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
  {
    path: 'vector-add-sub',
    title: 'Vector addition and subtraction',
  },
  {
    path: 'vector-mul-div',
    title: 'Vector multiplication and division',
  },
  {
    path: 'mover-constant-acceleration',
    title: 'Mover with constant acceleration',
  },
]

app.get('/', async (c) => {
  return c.render(
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
  const deps = e.deps?.split(' ')?.map(d => dependencyMap[d]) || []

  return c.render(
    <html>
      <meta>
        <title> {e.title} </title>
        <link rel="stylesheet" href="/static/styles.css" />
        <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js" />
        <script src="https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.5.nomodule.min.js" />
        <script src={drawingLib} />
        {deps.map(src => <script src={src} />)}
      </meta>
      <body>
        <main>
          <button class="drawing-lib-button">-</button>
          <h1> {e.title} </h1>
          <div id="global-vars-container"></div>
        </main>

        <script src="/static/helpers.js" />
        <script src={`/examples/${e.path}.js`} />
      </body>
    </html>)
})

export default {
  port: 8000,
  fetch: app.fetch,
}
