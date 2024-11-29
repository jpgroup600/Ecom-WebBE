const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MerchantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
  },
  address: {
    type: String,
    required: false,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  signupPath: {
    type: String,
    required: false,
  },
  TextFild1: {
    type: String,
    required: false,
  },
  TextFild2: {
    type: String,
    required: false,
  },
  TextFild3: {
    type: String,
    required: false,
  },
  image1: {
    type: String,
    required: false,
  },
  image2: {
    type: String,
    required: false,
  },
  image3: {
    type: String,
    required: false,
  },
  birthdate: {
    type: Date,
    required: false,
  },
});
const MerchantModel = mongoose.model("merchants", MerchantSchema);
module.exports = MerchantModel;