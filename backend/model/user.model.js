const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = Schema(
    {
      email: {
          type: String,
          required: true,
          unique: true
      },
      password: {
          type: String,
          requried: true,
      },
      firstName: {
          type: String,
          required: true,
      },
      lastName: {
          type: String,
          required: true,
      },
      type: {
          type: String,
          requried: true,
      },
      phoneNumber: {
          type: String,
          default: ""
      },
      birthday: {
          type: String,
          default: ""
      },
    },
    {
      collection: "User",
    }
  );
  
  try {
    module.exports = mongoose.model("User");
  } catch (error) {
    module.exports = mongoose.model("User", userSchema);
  }