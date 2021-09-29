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
    size: [
      {
        name: {
            type: String,
            required: true,
        },
        quaintity: {
            type: Number,
            required: true,
        }
      },
    ],
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
