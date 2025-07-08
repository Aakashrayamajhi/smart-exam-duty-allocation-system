import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from 'cookie-parser'

import contact from "./routes/contact.js"
import login from "./routes/login.js"
import calendar from "./routes/calendar.js"
import allocate from "./routes/allocate.js"
import availability from "./routes/availability.js"



const app = express()
const port = 3001

app.use(cors())
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(contact)
app.use(login)
app.use(calendar)
app.use(allocate)
app.use(availability)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
