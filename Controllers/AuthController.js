const UserModel = require("../Models/User");
const MerchantModel = require("../Models/Merchant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
       businessName,
       signupPath,
      phoneNumber,
      birthDate,
      influenceType,
      textField1,
      textField2,
      textField3,
      gender,
    } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({
          message: "User already exists, you can login",
          success: false,
        });
    }
    
    const userModel = new UserModel({
      name,
      email,
      password,
      address,
       businessName,
       signupPath,
      phoneNumber,
      birthDate,
      influenceType,
      textField1,
      textField2,
      textField3,
      gender,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup Successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication Falied, Username or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "20d" }
    );
    const da = {
      message: "Login Successfully",
      success: true,
      jwtToken,
      email,
      _id: user._id,
      name: user.name,
    };
    res.status(200).json(da);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
// Controller to find the user or merchant by email
const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the email is provided
    if (!email) return res.status(400).send("Email is required");

    // First, check for the user
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User found", type: "individual" });
    }

    // If no user, check for merchant
    const merchant = await MerchantModel.findOne({ email });
    if (merchant) {
      return res.status(200).json({ message: "Merchant found", type: "merchant" });
    }

    // If no match, return not found
    return res.status(404).send("No user or merchant found with this email");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  signup,
  login,
  findUserByEmail,
};