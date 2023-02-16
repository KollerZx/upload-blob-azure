import { Router } from 'express'
import config from '../config'
import { uploadHandler } from '../controllers/uploadHandler'

const uploadRoute = Router()

uploadRoute.post('/upload', config.uploadStrategy, uploadHandler)

export { uploadRoute }