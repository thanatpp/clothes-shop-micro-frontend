var express = require("express");
const router = express.Router();
const authorization = require("../config/auth");
const Address = require("../model/address.model");
const UserAddress = require("../model/userAddress.model");

const findAddressByZipcode = async (zipcode) => {
  return new Promise(async (resolve, reject) => {
    Address.find({ zipcode: zipcode }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Address not found"));
        }
      }
    });
  });
};

const findAddressUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    UserAddress.find({user: id}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Address not found"));
        }
      }
    }).populate({ path: "address", model: "Address" })
  });
};

const deleteUserAddressById = async (id) => {
  return new Promise((resolve, reject) => {
    UserAddress.findByIdAndDelete(id, (err, data) => {
      if (err) {
        reject(new Error("Cannot delete address"));
      } else {
        resolve({ message: "Delete address successfully" });
      }
    })
  })
}

const addAddressUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        var userAddress = new UserAddress(data);
        userAddress.save((err, data) => {
          if (err) {
            reject(new Error("Cannot insert userAddress to DB"));
          } else {
            resolve({ message: "Add userAddress Successfully" });
          }
        });
    });
  };

router.route("/get/zipcode/:zipzcode").get((req, res) => {
  findAddressByZipcode(req.params.zipzcode)
    .then((result) => {
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
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/get/user/:id").get(authorization, (req, res) => {
  findAddressUserById(req.params.id)
    .then((result) => {
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
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/delete/id/:id").delete(authorization, (req, res) => {
  deleteUserAddressById(req.params.id).then(
    (result) => {
      res.status(200).json({
        status: true,
        message: result.message,
      });
    }).catch((err) => {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    });
});

router.route("/add").post(authorization, (req, res) => {
    addAddressUser(req.body)
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
