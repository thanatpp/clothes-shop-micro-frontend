const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      requried: true,
    },
    detail: {
      type: String,
      required: true,
    },
    gender: {
      type: Schema.Types.ObjectId,
      ref: "Gender",
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    size: {
      xxs: {
        type: Number,
        default: 0,
      },
      xs: {
        type: Number,
        default: 0,
      },
      xs: {
        type: Number,
        default: 0,
      },
      s: {
        type: Number,
        default: 0,
      },
      m: {
        type: Number,
        default: 0,
      },
      l: {
        type: Number,
        default: 0,
      },
      xl: {
        type: Number,
        default: 0,
      },
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "Product",
  }
);

try {
  module.exports = mongoose.model("Product");
} catch (error) {
  module.exports = mongoose.model("Product", productSchema);
}
