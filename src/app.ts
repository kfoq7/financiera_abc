import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes/customers.routes'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/customers', router)

app.listen(PORT, () => {
  console.log(`Starting development server at http://localhost:${PORT}`)
})
