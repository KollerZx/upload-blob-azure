import express from 'express'
import { uploadRoute } from './routes/upload'

const app = express()
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(uploadRoute)

app.listen(PORT)
  .on("listening", () => console.log(`Server listening on ${PORT}`))