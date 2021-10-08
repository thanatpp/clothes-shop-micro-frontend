var express = require("express");
const router = express.Router();
const authorization = require("../config/auth");
const Order = require("../model/order.model");
const Cart = require("../model/cart.model");
const Product = require("../model/cart.model");

const addOrders = async (data) => {
    return new Promise((resolve, reject) => {
        Order.insertMany(data, (err, data) => {
            if(err){
                reject(new Error("Cannot insert Order to DB"));
            }else{
                resolve({ message: "Add order Successfully" });
            }
        })
    })
}

router.route("/add").post(authorization, (req, res) => {
    let cartid = getIdCart(req.body)
    addOrders(req.body).then(
        (result) => {
            
        }
    )
});

module.exports = router;
