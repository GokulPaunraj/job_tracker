const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/router.cjs')
const dotenv = require('dotenv')

dotenv.config()

app.use(cors({
    origin:'https://job-tracker-web-app.netlify.app',
}))
app.options('/(.*)/',cors())
app.use(express.json())

app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => { app.listen(5000, () => { console.log("server is up!") }) })
    .catch((err) => { console.log(err) })

app.use("/", router)
app.use("/new_user", router)
app.use("/user", router)
app.use("/update", router)
app.use("/send", router)
app.use("/verify", router)
app.use("/reset",router)