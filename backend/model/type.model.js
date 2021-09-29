const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = Schema(
  {
    name: {
      type: String,
      requried: true,
    },
  },
  {
    collection: "Type",
  }
);

try {
  module.exports = mongoose.model("Type");
} catch (error) {
  module.exports = mongoose.model("Type", typeSchema);
}