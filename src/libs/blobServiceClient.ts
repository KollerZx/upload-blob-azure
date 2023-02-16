import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";
import config from "../config";

export function blobServiceClient() {
  const sharedKeyCredential = new StorageSharedKeyCredential(config.AccountName, config.AccountKey);
  const blobServiceClient = new BlobServiceClient(`https://${config.AccountName}.blob.core.windows.net`, sharedKeyCredential);

  return blobServiceClient
}