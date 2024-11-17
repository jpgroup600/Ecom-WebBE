exports.registerUser = async (req, res) => {
    try {
      const { userId, productId, productName, userEmail } = req.body;
  
      if (!userId || !productId || !productName || !userEmail) {
        return res.status(400).json({
          message: "Bad Request: Missing required fields",
          requiredFields: ["userId", "productId", "productName", "userEmail"]
        });
      }
  
    //   const authorized = req.headers.authorization === ``;
    //   if (!authorized) {
    //     return res.status(401).json({
    //       message: "Unauthorized: Invalid or missing authorization token"
    //     });
    //   }
  
      console.log("Saving registration data:", { userId, productId, productName, userEmail });
  
      const productExists = true; 
      if (!productExists) {
        return res.status(404).json({
          message: "Product not found",
          productId: productId
        });
      }
  
      const alreadyRegistered = false; 
      if (alreadyRegistered) {
        return res.status(409).json({
          message: "Conflict: User is already registered for this product",
          userId: userId,
          productId: productId
        });
      }
  
      res.status(200).json({
        message: "Registration successful!",
        data: {
          userId,
          productId,
          productName,
          userEmail
        }
      });
  
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error.name === "ValidationError") {
        return res.status(422).json({
          message: "Unprocessable Entity: Invalid data format",
          error: error.message
        });
      }
  
      res.status(500).json({
        message: "Internal Server Error: Failed to register",
        error: error.message
      });
    }
  };
  