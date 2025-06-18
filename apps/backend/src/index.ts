import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { customersRouter } from './routers/customers-router'
import { accommodationsRouter } from './routers/accomodations-router'
import { hostingsRouter } from './routers/hostings-router'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/customers', customersRouter)
app.route('/accommodations', accommodationsRouter)
app.route('/hostings', hostingsRouter)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
