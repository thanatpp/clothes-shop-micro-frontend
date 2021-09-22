const mongoose = require("mongoose");

const url = `${process.env.URL_DB}`
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = (req, res, next) => {
  mongoose
    .connect(url, config)
    .then(() => {
      console.log("Connected to MongoDB....");
      next();
    })
    .catch(() => {
      console.log("Cannot connect to MongoDB !!!");
      res.status(501).send("Cannot connect to MongoDB !!!");
    });
};

module.exports = db;