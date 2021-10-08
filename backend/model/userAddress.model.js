const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAddressSchema = Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }
  },
  {
    collection: "UserAddress",
  }
);

try {
  module.exports = mongoose.model("UserAddress");
} catch (error) {
  module.exports = mongoose.model("UserAddress", UserAddressSchema);
}