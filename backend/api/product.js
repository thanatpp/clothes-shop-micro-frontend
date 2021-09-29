var express = require("express");
const router = express.Router();
const Product = require("../model/product.model");
const Gender = require("../model/gender.model");
const Type = require("../model/type.model");

const findOneGender = async (data) => {
  return new Promise(async (resolve, reject) => {
    Gender.findOne({ name: data }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Gender not found"));
        }
      }
    });
  });
};

const findOneType = async (data) => {
  return new Promise(async (resolve, reject) => {
    Type.findOne({ name: data }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Type not found"));
        }
      }
    });
  });
};

const addProduct = async (data) => {
  return new Promise((resolve, reject) => {
    var product = new Product(data);
    product.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Product to DB"));
      } else {
        resolve({ message: "Add Product Successfully" });
      }
    });
  });
};

const findOneProductById = async (id) => {
  return new Promise((resolve, reject) => {
    Product.findById(id, (err, data) => {
      if (err) {
        reject(new Error("Product not found"));
      } else {
        resolve(data);
      }
    })
      .populate({ path: "gender", model: "Gender" })
      .populate({ path: "type", model: "Type" });
  });
};

const findOneProductByGender = async (gender) => {
  return new Promise((resolve, reject) => {
    Product.find({ gender: gender }, (err, data) => {
      if (err) {
        reject(new Error("Product not found"));
      } else {
        resolve(data);
      }
    })
      .populate({ path: "gender", model: "Gender" })
      .populate({ path: "type", model: "Type" });
  });
};

const findOneProductByGenderType = async (gender, type) => {
    return new Promise((resolve, reject) => {
      Product.find({ gender: gender, type: type }, (err, data) => {
        if (err) {
          reject(new Error("Product not found"));
        } else {
          resolve(data);
        }
      })
        .populate({ path: "gender", model: "Gender" })
        .populate({ path: "type", model: "Type" });
    });
  };

router.route("/get/id/:id").get(async (req, res) => {
  findOneProductById(req.params.id)
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/get/gender/:gender").get(async (req, res) => {
  try {
    const resultGender = await findOneGender(String(req.params.gender));
    if (resultGender) {
      findOneProductByGender(resultGender._id)
        .then((result) => {
          res.status(200).json({
            status: true,
            data: result,
          });
        })
        .catch((err) => {
          res.status(404).json({
            status: false,
            message: err.message,
          });
        });
    }
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err.message,
    });
  }
});

router.route("/get/gender/:gender/type/:type").get(async (req, res) => {
    try {
      const resultGender = await findOneGender(String(req.params.gender));
      const resultType = await findOneType(String(req.params.type));
      if (resultGender && resultType) {
        findOneProductByGenderType(resultGender._id, resultType._id)
          .then((result) => {
            res.status(200).json({
              status: true,
              data: result,
            });
          })
          .catch((err) => {
            res.status(404).json({
              status: false,
              message: err.message,
            });
          });
      }
    } catch (err) {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    }
});

router.route("/add").post(async (req, res) => {
  try {
    const resultGender = await findOneGender(req.body.gender);
    const resultType = await findOneType(req.body.type);
    if (resultGender && resultType) {
      let data = req.body;
      data.gender = resultGender._id;
      data.type = resultType._id;
      addProduct(data)
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
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
