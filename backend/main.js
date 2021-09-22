require('dotenv').config({ path: './.env' })
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require("./config/db")
var app = express()

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST,GET,PUT,PATCH,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Option, Authorization"
    );
    return next();
})

app.use(bodyParser.json(), db);

app.use("/api/user", require("./api/user"));

app.listen(8080, () => {
    console.log('Application is running on port 8080')
})