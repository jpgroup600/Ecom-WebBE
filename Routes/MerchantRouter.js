const { signup, login } = require("../Controllers/MerchantController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/MerchantValidation");
const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
