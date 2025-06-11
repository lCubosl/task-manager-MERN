import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001


app.use(express.json())
// for debugging middlewsare purposes
app.use((req, res, next) => {
  console.log(`req method is ${req.method} & req URL is ${req.url}`)
  next()
})

app.use("/api/notes", notesRoutes)

// reverses order of application. server only starts after connection to mongo is established
// if connection fails, the app wont start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT)
  })
})
