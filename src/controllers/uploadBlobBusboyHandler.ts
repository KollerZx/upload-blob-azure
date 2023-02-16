import { NextFunction, Request, Response } from "express";
import { BusboyHandler } from "../libs/busboy";
import { pipeline } from "node:stream/promises";
export async function uploadBlobBusboyHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const busboy = new BusboyHandler(req.headers).init()
    await pipeline(
      req,
      busboy
    )

    req.on("error", (err) => {
      busboy.destroy(err)
      res.destroy()
    })

    req.on("close", () => {
      busboy.destroy()
      res.destroy()
    })

    res.status(201).send("upload successfully")
  } catch (error) {
    console.log(error)
  }
}