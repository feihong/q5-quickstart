import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('/examples/*', serveStatic({ root: './' }))

const examples = [
  {
    path: 'walker',
    title: 'Walker',
  }
]

app.get('/', async (c) => {
  return c.html(
    <html>
      <meta>
        <title>q5.js Quickstart</title>
      </meta>
      <body>
        <h1>q5.js Examples</h1>
        <ol>
          {examples.map(e => <li> <a href={`/e/${e.path}`}> {e.title} </a> </li>)}
        </ol>
      </body>
    </html>)
})

app.get('/e/:path', async (c) => {

  const results = examples.filter(e => e.path === c.req.param('path'))
  const e = results[0] || {path: '', title: 'Not found'}

  return c.html(
    <html>
      <meta>
        <title> {e.title} </title>
        <script src="https://q5js.org/q5.js"></script>
      </meta>
      <body>
        <h1> {e.title} </h1>
        <script src={`/examples/${e.path}.js`}></script>
      </body>
    </html>)
})

export default {
  port: 8000,
  fetch: app.fetch,
}
