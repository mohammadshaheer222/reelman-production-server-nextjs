const app = require("./app")
const connectDatabase = require("./db/database")

process.on("uncaughtException", (error) => {
    console.log(`Error: ${error.message}`)
    console.log("Shutting down the server for handling uncaught exception")
})

if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path: "config/.env"})
}

connectDatabase()

const server = app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))

process.on("unhandledRejection", (error) => {
    console.log(`Shutting down the server for ${error.message}`)
    console.log(`Shutting down the server for unhandled promise rejection`)
    server.close(() => {
        process.exit(1)
    })
})