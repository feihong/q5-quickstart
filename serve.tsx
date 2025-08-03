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
    deps: 'p5', // p5's noise function generates values that look more natural
  },
  {
    path: 'random-pixels',
    title: 'Each pixel is a random grayscale value',
  },
]

const css = `
  html, body { margin: 0; padding: 0; }
  canvas { border: 1px solid lightgray; }
  main {
    max-width: 70ch;
    padding: 3em 1em;
    margin: auto;
    line-height: 1.75;
    font-size: 1.25em;
  }`

const style = <style dangerouslySetInnerHTML={{ __html: css }} />

app.get('/', async (c) => {
  return c.html(
    <html>
      <meta>
        <title>q5.js Quickstart</title>
        {style}
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
  q5: 'https://q5js.org/q5.js',
  p5: 'https://cdn.jsdelivr.net/npm/p5@1.11.9/lib/p5.min.js',
}

app.get('/e/:path', async (c) => {
  const results = examples.filter(e => e.path === c.req.param('path'))
  const e = results[0] || { path: '', title: 'Not found' }
  const deps = (e.deps || 'p5').split(' ').map(d => dependencyMap[d] || '')

  return c.html(
    <html>
      <meta>
        <title> {e.title} </title>
        {style}
        <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js" />
        <script src="/static/helpers.js" />
        {deps.map(u => <script src={u}></script>)}
      </meta>
      <body>
        <main>
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
