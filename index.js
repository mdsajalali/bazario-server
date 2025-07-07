const cors = require("cors");
require("dotenv/config");
const express = require("express");
const { connectDB } = require("./config/db.js");
const { verifyToken, isAdmin } = require("./middleware/auth.middleware.js");
const categoryRoutes = require("./routes/category.route.js");
const authRoutes = require("./routes/auth.route.js");
const brandRoutes = require("./routes/brand.route.js")
const productRoutes = require("./routes/product.route.js")
const shopRoutes = require("./routes/shop.route.js")

// app config
const app = express();
const port = process.env.PORT || 5000;

// db connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/v1/categories", verifyToken, isAdmin, categoryRoutes);
app.use("/api/v1/brand", verifyToken, isAdmin, brandRoutes);
app.use("/api/v1/product", verifyToken, isAdmin, productRoutes);
app.use("/api/v1/shop", verifyToken, shopRoutes)
app.use("/api/v1/auth", authRoutes);

app.get("/api/v1", (req, res) => {
  res.send("Welcome to bazario server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
