import Busboy, { FileInfo } from 'busboy'
import { IncomingHttpHeaders } from 'node:http'
import { getBlobName } from '../utils'
import { BlobService } from './blobServiceClient'
import config from '../config'
import { PassThrough, Readable } from 'node:stream'


export class BusboyHandler {
  constructor(private headers: IncomingHttpHeaders) { }

  private async onFile(name: string, file: Readable, info: FileInfo) {
    const filename = info.filename
    const blobName = getBlobName(filename)
    const blobService = new BlobService().client
    const container = blobService.getContainerClient(config.ContainerName)
    const blockBlobClient = container.getBlockBlobClient(blobName)

    const stream = new PassThrough()
    file.pipe(stream)

    await container.createIfNotExists()

    await blockBlobClient.uploadStream(stream)
  }

  init() {
    const busboy = Busboy({ headers: this.headers })

    busboy.on('file', this.onFile)

    return busboy
  }
}
