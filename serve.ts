import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', async (c) => {
  return c.html('<h1>Hello</h1>')
})


export default {
  port: 8000,
  fetch: app.fetch,
}
