import { randomUUID as uuid } from "node:crypto"

export const getBlobName = (originalName: string) => {
  const identifier = `${uuid()}-${originalName}`
  return identifier
}

