var express = require("express");
const router = express.Router();
const Gender = require("../model/gender.model");

const addGender = async (data) => {
  return new Promise((resolve, reject) => {
    var gender = new Gender(data);
    gender.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Gender to DB"));
      } else {
        resolve({ message: "Add Gender Successfully" });
      }
    });
  });
};

router.route("/add").post((req, res) => {
  addGender(req.body)
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
});

module.exports = router;
