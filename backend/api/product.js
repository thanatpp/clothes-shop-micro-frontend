var express = require("express");
const router = express.Router();
const authorization = require("../config/auth");
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

const findProduct = async () => {
  return new Promise(async (resolve, reject) => {
    Product.find((err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Product."));
        }
      }
    })
      .populate({ path: "gender", model: "Gender" })
      .populate({ path: "type", model: "Type" });
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
    })
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
        console.log(err)
        reject(new Error("Product not found"));
      } else {
        resolve(data);
      }
    })
  });
};

const updateProduct = async (id, data) => {
  return new Promise((resolve, reject) => {
    console.log(data.name, id);
    Product.updateOne(
      { _id: id },
      {
        name: data.name,
        price: Number(data.price),
        img: data.img,
        detail: data.detail,
      },
      (err, data) => {
        if (err) {
          reject(new Error("Product not found"));
        } else {
          resolve("Update product successfully.");
        }
      }
    );
  });
};

const deleteProduct = async (id) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndDelete(id, (err, data) => {
      if(err){
        reject(err)
      }else{
        resolve("Delete product successfully.")
      }
    })
  })
}

const incProduct = async (id, type, size, quantity) => {
  return new Promise((resolve, reject) => {
    if (type === "accessories") {
      Product.updateOne(
        { _id: id },
        {
          $inc: {
            quantity: quantity,
          },
        },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "xxs") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.xxs": quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "xs") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.xs": quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "s") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.s": quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "m") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.m": quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "l") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.l": quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "xl") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.xl": quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    }
  });
};

const decProduct = async (id, type, size, quantity) => {
  return new Promise((resolve, reject) => {
    if (type === "accessories") {
      Product.updateOne(
        { _id: id },
        {
          $inc: {
            quantity: -quantity,
          },
        },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "xxs") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.xxs": -quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "xs") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.xs": -quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "s") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.s": -quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "m") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.m": -quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "l") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.l": -quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    } else if (size === "xl") {
      Product.updateOne(
        { _id: id },
        { $inc: { "size.xl": -quantity } },
        {
          upsert: true,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    }
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

router.route("/get/all/").get(async (req, res) => {
  findProduct()
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

router.route("/update/id/:id").put(authorization, (req, res) => {
  updateProduct(req.params.id, req.body)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/update/dec/:id").put(authorization, (req, res) => {
  decProduct(req.params.id, req.body.type, req.body.size, req.body.quantity)
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

router.route("/update/inc/:id").put(authorization, (req, res) => {
  incProduct(req.params.id, req.body.type, req.body.size, req.body.quantity)
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

router.route("/delete/id/:id").delete(authorization, (req, res) => {
  deleteProduct(req.params.id).then((result) => {
    res.status(200).json({
      status: true,
      message: result,
    });
  }).catch((err) => {
    res.status(404).json({
      status: false,
      message: err.message,
    });
  })
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

router.route("/add").post(authorization, async (req, res) => {
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
