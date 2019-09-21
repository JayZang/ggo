import "module-alias/register"
import express from "express"
import compression from "compression"  // compresses requests
import session from "express-session"
import bodyParser from "body-parser"
import path from "path"
import mongoose from "mongoose"

// Create Express server
const app = express()

// Connect to MongoDB
// mongoose.Promise = Promise

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true } ).then(
//     () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
// ).catch(err => {
//     console.log("MongoDB connection error. Please make sure MongoDB is running. " + err)
//     // process.exit()
// })

// Express configuration
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res) => {
    res.json({
        message: 'Hello World',
        cookies: req.cookies || 'None'
    })
})

export default app
