import { StorageSharedKeyCredential, BlobServiceClient, generateBlobSASQueryParameters } from "@azure/storage-blob";
import config from "../config";
import { BlobSASPermissions } from "@azure/storage-blob";
export class BlobService {
  private AccountName: string
  private AccountKey: string
  private Container: string
  private sharedKeyCredential: any
  public client: BlobServiceClient
  constructor(AccountName?: string, AccountKey?: string, Container?: string) {
    this.AccountName = AccountName || config.AccountName
    this.AccountKey = AccountKey || config.AccountKey
    this.Container = Container || config.ContainerName
    this.client = this.connect()
  }

  private connect() {
    const sharedKeyCredential = new StorageSharedKeyCredential(this.AccountName, this.AccountKey);
    this.sharedKeyCredential = sharedKeyCredential
    const blobServiceClient = new BlobServiceClient(`https://${this.AccountName}.blob.core.windows.net`, sharedKeyCredential);
    return blobServiceClient
  }

  async uploadData(buffer: Buffer, filename: string) {
    const container = this.client.getContainerClient(this.Container)
    const blockBlobClient = container.getBlockBlobClient(filename)
    await container.createIfNotExists()

    const uploadBlobResponse = await blockBlobClient.uploadData(buffer)

    console.log(`Upload Successfully: ${uploadBlobResponse.requestId}`)

    return {
      filename
    }
  }

  async deleteBlob(filename: string) {
    const container = this.client.getContainerClient(this.Container)
    await container.deleteBlob(filename, { deleteSnapshots: "include" })
  }

  async getPrivateBlob(filename: string) {
    const oneHourInMilliseconds = 3600 * 1000
    const blobSas = generateBlobSASQueryParameters(
      {
        containerName: this.Container,
        blobName: filename,
        permissions: BlobSASPermissions.parse('r'),
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + oneHourInMilliseconds) // Expires after 1 hour
      },
      this.sharedKeyCredential
    )

    const imageUrl = `${this.client.url}${this.Container}/${filename}?${blobSas.toString()}`

    console.log(`Url de acesso ${imageUrl}`)

    return imageUrl
  }

  async getPublicBlob(filename: string) {
    const container = this.client.getContainerClient(this.Container)
    const { url } = container.getPageBlobClient(filename)

    return url
  }
}
