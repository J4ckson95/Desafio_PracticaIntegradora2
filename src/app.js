import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewRouter from "./routes/views.route.js"

const app = express()
const mongoURL = "mongodb+srv://J4ckson:IIQyDhhK1Ax1pSgX@coderhousebackend.jdnxmo1.mongodb.net/"
const dbMongo = "ecommerce"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + `/views`)
app.set("view engine", "handlebars")

app.use("/", viewRouter)

mongoose.connect(mongoURL, { dbName: dbMongo }).then(() => {
    app.listen(9090, () => console.log("Running Server ..."))
    console.log("DataBase connected");
})