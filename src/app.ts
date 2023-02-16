import express from 'express'
import { uploadRoute } from './routes/upload'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(uploadRoute)

export { app }