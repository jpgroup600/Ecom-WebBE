const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const MerchantRouter = require("./Routes/MerchantRouter");
const ProductRouter = require("./Routes/ProductRouter");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const FileUploadRouter = require("./Routes/FileUploadRouter");
const PublicProductRouter = require("./Routes/PublicProductsRouter");
const GetSpecificProduct = require("./Routes/GetSpecificProductRouter");
const notificationRoutes = require("./Routes/notificationrouter");
const morgan = require("morgan");

require("dotenv").config();
require("./config/db");
require("./Middlewares/passportSetup");

const PORT = process.env.PORT || 3000;
const passport = require("passport");
const ReviewerRouter = require("./Routes/reviewer");
const AdminRouter = require("./Routes/Admin");
const NewRouter = require("./Routes/New");
const FinalRouter = require("./Routes/Final");

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE", // Allow specific methods
    allowedHeaders: "*", // Allow specific headers
  })
);

app.use("/images", FileUploadRouter);
app.use("/uploads", express.static("./uploads"));
app.use("/products", PublicProductRouter);
app.use("/products", GetSpecificProduct);
app.use("/notifications", notificationRoutes);
app.use("/new", notificationRoutes);
app.use("/final", FinalRouter);

// Middleware
app.use(passport.initialize()); // Removed passport.session()

// Routes
app.use("/auth", AuthRouter);
app.use("/merchant", MerchantRouter);
app.use("/products", ProductRouter);
app.use("/reviewer", ReviewerRouter);
app.use("/admin", AdminRouter);
app.use("/new", NewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
