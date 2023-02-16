import dotenv from 'dotenv'
dotenv.config()
import multer from 'multer'

const inMemoryStorage = multer.memoryStorage()

const config = {
  ContainerName: String(process.env.AZURE_STORAGE_CONTAINER_NAME),
  AccountName: String(process.env.AZURE_ACCOUNT_NAME),
  AccountKey: String(process.env.AZURE_ACCOUNT_KEY),

  uploadStrategy: multer({ storage: inMemoryStorage }).single('image'),
}

export default config
