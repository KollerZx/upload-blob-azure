import { Router } from 'express'
import config from '../config'
import { uploadHandler } from '../controllers/uploadBlobHandler'
import { getPublicBlobHandler } from '../controllers/getPublicBlobHandler'
import { deleteBlobHandler } from '../controllers/deleteBlobHandler'

const uploadRoute = Router()

uploadRoute.post('/upload', config.uploadStrategy, uploadHandler)

uploadRoute.get('/image/:filename', getPublicBlobHandler)

uploadRoute.delete('/delete/:filename', deleteBlobHandler)

export { uploadRoute }