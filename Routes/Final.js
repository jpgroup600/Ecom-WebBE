const FinalRouter = require("express").Router();
const Banners = require("../Models/Banners");
const TextField = require("../Models/Heading");
const Notification = require("../models/Notification");
const ProductModel = require("../Models/Product");
const TabsModel = require("../Models/Tabs");
const User = require("../Models/User");

FinalRouter.post("/register", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Find the product by productId
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingUser = product.registeredUsers.find(
      (registeredUser) => registeredUser.email == user.email
    );

    if (existingUser) {
      return res
        .status(205)
        .json({ message: "you have already registered  on this product" });
    }

    // Push the user's email to the registeredUsers array
    product.registeredUsers.push({
      email: user.email,
      status: "pending", // default status for the registered user
    });

    // Save the updated product
    await product.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
FinalRouter.post("/registerAction", async (req, res) => {
  const { email, productId, action } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Find the product by productId
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the index of the registered user by email
    const userIndex = product.registeredUsers.findIndex(
      (registeredUser) => registeredUser.email === email
    );
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ message: "User not registered for this product" });
    }

    // Update the user's status in the registeredUsers array
    product.registeredUsers[userIndex].status = action;

    // Save the updated product
    await product.save();
    await CreateNotification(
      "test",
      user._id,
      "Your Registration Request has been " + action
    );

    return res
      .status(200)
      .json({ message: "User status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

FinalRouter.post("/myNotifications", async (req, res) => {
  const userId = req.body.userId;
  try {
    const notifications = await Notification.find({ receiver: userId }).select(
      "-_id -updatedAt -sender -__v"
    );
    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

async function CreateNotification(
  sender = "Test",
  receiver,
  message,
  type = "registerStatus"
) {
  const notification = new Notification({ sender, receiver, message, type });

  await notification.save();
  return notification;
}

FinalRouter.get("/getBanner", async (req, res) => {
  try {
    const banners = await Banners.find().select("-__v");
    res.status(200).json({ banners });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
FinalRouter.get("/getheadings", async (req, res) => {
  try {
    const headings = await TextField.find().select("-__v");
    res.status(200).json({ headings });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
FinalRouter.get("/getTabs", async (req, res) => {
  try {
    const tabs = await TabsModel.find().select("-__v");
    res.status(200).json({ tabs });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = FinalRouter;
