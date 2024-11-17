const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const MerchantRouter = require("./Routes/MerchantRouter");
const ProductRouter = require("./Routes/ProductRouter");
const swaggerJSDoc = require("swagger-jsdoc"); // Ensure correct import
const swaggerUi = require("swagger-ui-express");
// const PublicProductRouter = require("./Routes/PublicProductsRouter");
const FileUploadRouter = require("./Routes/FileUploadRouter");
const session = require("express-session");
const morgan = require("morgan");
const notificationRoutes = require('./Routes/notificationRoutes');
require("dotenv").config();
require("./config/db");
require("./Middlewares/passportSetup");
const notificationRoutes = require("./routes/notifications")

const PORT = process.env.PORT || 8080;
const passport = require("passport");
const ReviewerRouter = require("./Routes/reviewer");
const AdminRouter = require("./Routes/Admin");
const NewRouter = require("./Routes/New");
const swaggerOptions = require("./config/swaggerOptions"); 
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE", // Allow specific methods
    allowedHeaders: "*", // Allow specific headers
  })
);
app.use(
  session({
    secret: "your_secret_key_hajhshdyqgdkasdiqgiuwbdqydt87", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/images", FileUploadRouter);
app.use("/uploads", express.static("./uploads"));


// Middleware

app.use(passport.initialize());
app.use(passport.session());


const swaggerSpec = swaggerJSDoc(swaggerOptions); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/auth", AuthRouter);
app.use("/merchant", MerchantRouter);
// app.use("/products", PublicProductRouter);
app.use("/products", ProductRouter); // Product routes
app.use("/reviewer", ReviewerRouter); // Product routes
app.use("/admin", AdminRouter); // Product routes
app.use("/new", NewRouter);

app.use('/api', notificationRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/notifications", notificationRoutes);
app.get("req,res", () => {
  res.json({ message: "Hello World" });
});
