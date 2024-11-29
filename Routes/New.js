const ProductModel = require("../Models/Product");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const NewRouter = require("express").Router();
NewRouter.get("/every", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});
NewRouter.post("/getOwn", async (req, res) => {
  try {
    const products = await ProductModel.find({
      registeredUsers: { $in: [req.body.email] },
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});
NewRouter.post("/getProducts", async (req, res) => {
  try {
    const products = await ProductModel.find({
      email: req.body.email,
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});
NewRouter.post("/delete", async (req, res) => {
  try {
    // Find and delete the product based on product ID and email
    const product = await ProductModel.findOneAndDelete({
      _id: req.body.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.registeredUsers && product.registeredUsers.length > 0) {
      return res.status(400).json({
        message: "Product cannot be deleted as there are registered users.",
      });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
});
NewRouter.post("/getProd", async (req, res) => {
  try {
    id = req.body._id;
    const products = await ProductModel.find({ _id: id });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});
NewRouter.post("/getUser", async (req, res) => {
  try {
    id = req.body.email;
    const products = await User.find({ email: id });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});

module.exports = NewRouter;
