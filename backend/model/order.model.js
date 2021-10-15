const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "UserAddress",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Order",
  }
);

try {
  module.exports = mongoose.model("Order");
} catch (error) {
  module.exports = mongoose.model("Order", orderSchema);
}
