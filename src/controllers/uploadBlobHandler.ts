import { NextFunction, Request, Response } from "express";
import { getBlobName } from "../utils";
import { BlobService } from "../libs/blobServiceClient";

export async function uploadHandler(req: Request, res: Response, next: NextFunction) {
  try {
    if (req?.file) {
      const blobName = getBlobName(req.file?.originalname)
      const buffer = req.file.buffer
      const blobService = new BlobService()
      const { filename } = await blobService.uploadData(buffer, blobName)
      res.status(201).send({ filename })
    }
  } catch (error) {
    console.log(error)
  }
}