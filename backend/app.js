const express = require("express");
const path = require("path");
require("dotenv").config(); 
require("./db"); 

const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const app = express();

/************ MIDDLEWARE ************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/************ ROUTES ************/
app.use("/api/v1/", productRoute);
app.use("/api/v1/user", authRoute);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Ecommerce API is running!");
});

/************ PRODUCTION FRONTEND ************/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

/************ START SERVER ************/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
