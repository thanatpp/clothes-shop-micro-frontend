var express = require("express");
const router = express.Router();
const authorization = require("../config/auth");
const Order = require("../model/order.model");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

const deleteCart = async (data) => {
  var _data = [];
  for (let item of data) {
    _data.push(item._id);
  }
  return new Promise((resolve, reject) => {
    Cart.deleteMany({ _id: _data }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Add order Successfully");
      }
    });
  });
};

const addOrders = async (data) => {
  return new Promise((resolve, reject) => {
    Order.insertMany(data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Add order Successfully");
      }
    });
  });
};

const updateQuantityProduct = async (data) => {
  return new Promise((resolve, reject) => {
    for (let item of data) {
      if (item.product.type.name === "accessories") {
        Product.updateOne(
          { _id: item.product._id },
          {
            $inc: {
              quantity: -item.quantity,
            },
          },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (item.size === "xxs") {
        Product.updateOne(
          { _id: item.product._id },
          { $inc: { "size.xxs": -item.quantity } },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (item.size === "xs") {
        Product.updateOne(
          { _id: item.product._id },
          { $inc: { "size.xs": -item.quantity } },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (item.size === "s") {
        Product.updateOne(
          { _id: item.product._id },
          { $inc: { "size.s": -item.quantity } },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (item.size === "m") {
        Product.updateOne(
          { _id: item.product._id },
          { $inc: { "size.m": -item.quantity } },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (item.size === "l") {
        Product.updateOne(
          { _id: item.product._id },
          { $inc: { "size.l": -item.quantity } },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (item.size === "xl") {
        Product.updateOne(
          { _id: item.product._id },
          { $inc: { "size.xl": -item.quantity } },
          (err, data) => {
            if (err) {
              reject(err);
            }
          }
        );
      }
    }
    resolve("update product successfully");
  });
};

const getOrder = async (data) => {
  return new Promise((resolve, reject) => {
    Order.find({user: data}, (err, data) => {
      if (err) {
        reject("Cannot get Order.");
      } else {
        resolve(data);
      }
    })
    .populate({ path: "product", model: "Product", populate: [{ path: "type", model: "Type"}, { path: "gender", model: "Gender"}]})
    .populate({ path: "user", model: "User" })
    .populate({ path: "address", model: "UserAddress", populate: { path: "address", model: "Address"}});
  });
};

router.route("/add").post(authorization, (req, res) => {
  updateQuantityProduct(req.body.data)
    .then((result) => {
      addOrders(req.body.order)
        .then((result) => {
          deleteCart(req.body.data)
            .then((result) => {
              res.status(200).json({
                status: true,
                message: result,
              });
            })
            .catch((err) => {
              res.status(400).json({
                status: false,
                message: err.message,
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            status: false,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/get/user/:id").get(authorization, (req, res) => {
  getOrder(req.params.id).then((result) => {
    if(result.length !== 0){
      res.status(200).json({
        status: true,
        data: result,
      });
    }else{
      res.status(200).json({
        status: false,
        data: result,
      });
    }
  }).catch((err) => {
    res.status(400).json({
      status: false,
      message: err,
    });
  });
});

module.exports = router;
