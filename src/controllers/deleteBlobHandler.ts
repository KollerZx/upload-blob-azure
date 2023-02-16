import { NextFunction, Request, Response } from "express";
import { BlobService } from "../libs/blobServiceClient";

export async function deleteBlobHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filename = req.params.filename
    const blobServiceClient = new BlobService()
    await blobServiceClient.deleteBlob(filename)
    res.status(204).end()
  } catch (error: any) {
    res.status(500).end(error?.message)
    console.log(error)
  }
}