const ProductModel = require("../Models/Product");

const MerchantModel = require("../Models/Merchant");

const addProduct = async (req, res) => {
  try {
    const {
      userId,
      service,
      campaignName,
      isVisitOrShip,
      setToCompaign,
      location,
      checkDay,
      availableTime,
      numberOfPeople,
      image,
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      textArea5,
      email,
      channel,
      uploadedDate,
      registeredUsers,
      image1,
      image2,
      image3,
      catagory,
      token
      
    } = req.body;
    // Create a new product with userId (no email validation here)
    const product = new ProductModel({
      userId,
      service,
      email: email,
      campaignName,
      setToCompaign,
      isVisitOrShip,
      location,
      checkDay,
      availableTime,
      numberOfPeople,
      image,
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      textArea5,
      channel,
      uploadedDate,
      registeredUsers,
      image1,
      image2,
      image3,
      catagory,
      token
    });
    // Save the product to the database
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Error adding product:", err);
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};

const checkUserByEmail = async (email) => {
  try {
    const user = await MerchantModel.findOne({ email: email });
    return !!user;
  } catch (e) {
    console.error("Error checking user by email:", e);
    return false;
  }
};
const getEveryProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};
// Get all products
const getAllProducts = async (req, res) => {
  const email = req.query.email;

  const userExists = await checkUserByEmail(email);

  if (!userExists) {
    res.sendStatus(404); // User not found
    return;
  }

  try {
    const products = await ProductModel.find({ email: email });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};
const getSpecificProducts = async (req, res) => {
  const productId = req.query.productId;

  try {
    const products = await ProductModel.find({ _id: productId });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};
const registeredUsers = async (req, res) => {
  const productId = req.query.productId;

  try {
    const product = await ProductModel.findById(productId).populate("users");

    if (!product) {
      return { message: "Product not found" };
    }

    const resx = {
      registeredUsers: product.users, // This will return the populated users
    };
    res.status(200).json(resx);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      campaignName,
      isVisitOrShip,
      location,
      checkDay,
      availableTime,
      numberOfPeople,
      image,
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      textArea5,
      channel,
    } = req.body;

    // Find and update the product based on product ID and email
    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params.id, email: req.body.email },
      {
        campaignName,
        isVisitOrShip,
        location,
        checkDay,
        availableTime,
        numberOfPeople,
        image,
        textArea1,
        textArea2,
        textArea3,
        textArea4,
        textArea5,
        channel,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// Delete a product (associated with user's email)
const deleteProduct = async (req, res) => {
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
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    // Find product by ID
    const product = await ProductModel.findById(req.params.id);
    
    // If product not found, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Send the product in the response
    res.status(200).json(product);
  } catch (err) {
    // If there's an error, return 500 and the error message
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};


// Function to fetch all products
const getAllpublicProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find({});

    // Send the products as the response
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors that occur
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Unable to fetch products." });
  }
};

exports.registerForProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    // Logic to handle registration goes here
    res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSpecificProducts,
  registeredUsers,
  getEveryProduct,
  getAllpublicProducts,
  getProductById,
};
