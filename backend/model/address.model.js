const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = Schema(
  {
    district: {
      type: String,
    },
    amphoe: {
      type: String,
    },
    province: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    district_code: {
        type: Number,
    },
    amphoe_code: {
        type: Number,
    },
    province_code: {
        type: Number
    }
  },
  {
    collection: "Address",
  }
);

try {
  module.exports = mongoose.model("Address");
} catch (error) {
  module.exports = mongoose.model("Address", AddressSchema);
}