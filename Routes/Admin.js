const ProductModel = require("../Models/Product");
const router = require("express").Router();
const AdminRouter = require("express").Router();

router.post("/approve", async (req, res) => {
  try {
    const productId = req.body.id;

    // Find all products where the user is a reviewer
    const result = await ProductModel.updateMany(
      { productId }, // Filter condition
      { $set: { status: "approved" } } // Update operation to set status to "approved"
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given productId" });
    }

    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the products." });
  }
});

module.exports = AdminRouter;
