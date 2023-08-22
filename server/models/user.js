const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subscriptions: {
    type: Array,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
  }
});
mongoose.model("User", userSchema);
