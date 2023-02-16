import { NextFunction, Request, Response } from "express";
import { BlobService } from "../libs/blobServiceClient";

export async function getPublicBlobHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filename = req.params.filename
    const blobServiceClient = new BlobService()
    const url = await blobServiceClient.getPrivateBlob(filename)
    res.status(200).send({ url })
  } catch (error: any) {
    res.status(500).end(error?.message)
    console.log(error)
  }
}