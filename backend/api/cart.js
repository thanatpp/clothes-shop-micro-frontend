var express = require("express");
const router = express.Router();
const authorization = require("../config/auth");
const Cart = require("../model/cart.model");

const addCart = async (data) => {
  return new Promise((resolve, reject) => {
    var cart = new Cart(data);
    cart.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Cart to DB"));
      } else {
        resolve({ message: "Add Cart Successfully" });
      }
    });
  });
};

const getCartByUser = async (id) => {
  return new Promise((resolve, reject) => {
    Cart.find({ user: id }, (err, data) => {
      if (err) {
        reject(new Error("Cart not found"));
      } else {
        resolve(data);
      }
    }).populate({ path: "product", model: "Product", populate: {
      path: "type", model: "Type"
    }})
  });
};

const updateCart = async (id, quantity) => {
  return new Promise((resolve, reject) => {
    Cart.findByIdAndUpdate(id, { quantity: quantity }, (err, data) => {
      if (err) {
        reject(new Error("Cannot update Cart"));
      } else {
        resolve("Update Successfully");
      }
    });
  });
};

const deleteProductInCart = async (id) => {
  return new Promise((resolve, reject) => {
    Cart.findOneAndDelete({product: id}, (err) => {
      if (err) {
        reject(new Error("Cannot delete Product in Cart"));
      } else {
        resolve("Delete Successfully");
      }
    })
  })
}

router.route("/get/user/:id").get(authorization, (req, res) => {
  getCartByUser(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        res.status(200).json({
          status: false,
          message: "not found Product in Cart",
        });
      } else {
        res.status(200).json({
          status: true,
          data: result,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/update/:id").put(authorization, (req, res) => {
  updateCart(req.params.id, req.body.quantity)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/delete/:id").delete(authorization, (req, res) => {
  deleteProductInCart(req.params.id).then((result) => {
    res.status(200).json({
      status: true,
      message: result,
    });
  }).catch((err) => {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  })
});

router.route("/add").post(authorization, (req, res) => {
  addCart(req.body)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result.message,
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
