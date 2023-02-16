import config from "../config";
import { blobServiceClient } from "../libs/blobServiceClient";

export async function UploadService(buffer: Buffer, filename: string) {
  try {
    const blobService = blobServiceClient()
    const containerClient = blobService.getContainerClient(config.ContainerName)
    const blockBlobClient = containerClient.getBlockBlobClient(filename)
    await containerClient.createIfNotExists()

    const uploadBlobResponse = await blockBlobClient.uploadData(buffer)

    console.log(`Upload Successfully: ${uploadBlobResponse.requestId}`)
    return {
      status: 201,
      message: "Upload Successfully"
    }
  } catch (error) {
    console.log(`Error uploading: ${error}`)
    return {
      status: 500,
      message: "Error uploading"
    }
  }
}