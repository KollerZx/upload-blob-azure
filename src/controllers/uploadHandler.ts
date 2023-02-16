import { NextFunction, Request, Response } from "express";
import { getBlobName } from "../utils";
import { UploadService } from '../services/UploadService'

export async function uploadHandler(req: Request, res: Response, next: NextFunction) {
  try {
    if (req?.file) {
      const blobName = getBlobName(req.file?.originalname)
      const buffer = req.file.buffer
      const { status, message } = await UploadService(buffer, blobName)
      res.status(status).end(message)
    }
  } catch (error) {
    console.log(error)
  }
}