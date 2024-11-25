const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  setToCompaign: {
    type:Boolean,
    default: false,
    required:false,
  },
  isVisitOrShip: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  checkDay: {
    type: String,
    required: true,
  },
  availableTime: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  textArea1: {
    type: String,
    required: true,
  },
  textArea2: {
    type: String,
    required: true,
  },
  textArea3: {
    type: String,
    required: true,
  },
  textArea4: {
    type: String,
    required: true,
  },
  textArea5: {
    type: String,
    required: true,
  },
  channel: {
    type: [String], // Array to hold multiple values
    required: true,
  },
  uploadedDate: {
    type: Date,
  },
  registeredUsers: [
    {
      email: {
        type: String,
      },
    status:{
      type: String,
      default: "pending",
     
    }
    },
  ], 
  catagory: { type: String, required: false, default: "" },
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
  status: {
    type: String,
    required: false,
    default: "pending",
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,  
  },
});
  const ProductModel = mongoose.model("products", ProductSchema);
  module.exports = ProductModel;