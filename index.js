const express = require("express");
const cors = require("cors");

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const mongoose = require("mongoose");
const AppError = require("./utils/AppError");
const status = require("statuses");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect('mongodb+srv://nadasalahit:E1ylkLJ2DxVryXev@cluster0.qsj8rs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
   console.log(err);
    console.log("Error connecting to database");
  });

const app = express();
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  res.send("Uploaded Successfully");
});

app.use((req, res, next) => {
  next(new AppError(404, `Can not find ${req.originalUrl} on this server`));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went wrong",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server started successfully on port ${port}`);
});
