var express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authorization = require("../config/auth");
const KEY = `${process.env.SECRET_KEY}`;

const makeHash = async (password) => {
  const hash = await bcrypt.hash(password, Number(process.env.HASH_SALT));
  return hash;
};

const compareHash = async (password, hash) => {
  return new Promise((reslove, reject) => {
    bcrypt.compare(password, hash, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        reslove(data);
      }
    });
  });
};

const addUser = async (data) => {
  return new Promise((resolve, reject) => {
    var user = new User(data);
    user.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert User to DB"));
      } else {
        resolve({ message: "Add User Successfully" });
      }
    });
  });
};

const findOneUserById = async (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, data) => {
      if(err){
        reject(err)
      }else{
        if(data){
          resolve(data)
        }else{
          reject(new Error("User not found"));
        }
      }
    })
  })
}

const findOneUser = async (email) => {
  return new Promise(async (resolve, reject) => {
    User.findOne({ email: email }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Email not found"));
        }
      }
    });
  });
};

const updateUserById = async (id, data) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, data, (err, data) => {
      if(err){
        reject(err)
      }else{
        resolve("Update user successfully")
      }
    })
  })
}

router.route("/add").post((req, res) => {
  makeHash(req.body.password).then((hash) => {
    var data = new User(req.body);
    data.password = hash;
    addUser(data)
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
});

router.route("/update/id/:id").put(authorization, (req, res) => {
  updateUserById(req.params.id, req.body).then(
    (result) => {
      res.status(200).json({
        status: true,
        message: result,
      });
    }).catch((err) => {
      res.status(400).json({
        status: false,
        message: "Cannot update user",
      });
    })
});

router.route("/get/id/:id").get(authorization, (req, res) => {
  findOneUserById(req.params.id).then(
    (result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    }).catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    })
});

router.route("/login").post(async (req, res) => {
  try {
    const result = await findOneUser(req.body.email);
    if (result) {
      const status = await compareHash(req.body.password, result.password);
      if (status) {
        user = {
          _id: result._id,
          type: result.type,
        };
        const token = jwt.sign(user, KEY, { expiresIn: "10m" });
        res.status(200).json({
          status: true,
          data: { user, token },
          ttl: Date.now() + (10 * 60 * 1000),
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Incorrect password",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Email not found",
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
