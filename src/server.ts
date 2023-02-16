import { app } from "./app"

const PORT = process.env.PORT || 8080
const server = app.listen(PORT)

server
  .on("listening", () => console.log(`Server listening on ${PORT}`))

process
  .on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server")
    server.close(() => {
      console.log('HTTP server closed')
      process.exit()
    })
  })
  .on("uncaughtException", (err) => {
    console.log("Uncaught Exception", err)
    server.close(() => {
      console.log('HTTP server closed')
      process.exit()
    })
  })
  .on("unhandledRejection", (reason, p) => {
    console.log(`UnhandledRejection due ${reason} at Promise ${p} `)
    server.close(() => {
      console.log('HTTP server closed')
      process.exit()
    })
  })