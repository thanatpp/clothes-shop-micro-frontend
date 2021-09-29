var express = require("express");
const router = express.Router();
const Type = require("../model/type.model");

const addType = async (data) => {
  return new Promise((resolve, reject) => {
    var type = new Type(data);
    type.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Type to DB"));
      } else {
        resolve({ message: "Add Type Successfully" });
      }
    });
  });
};

router.route("/add").post((req, res) => {
  addType(req.body)
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
