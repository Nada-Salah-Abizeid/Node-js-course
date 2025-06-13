 const express = require("express");
 const cors=require('cors');
 const cartRoutes=require("./routes/cart");
 const orderRoutes=require("./routes/order")
 const productRoutes= require("./routes/products")
 const usersRoutes=require("./routes/users");
 const mongoose=require("mongoose");
const AppError = require("./utils/AppError");
const status = require("statuses");
const multer= require("multer");




 mongoose.connect('mongodb+srv://nadasalahit:E1ylkLJ2DxVryXev@cluster0.qsj8rs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
 .then(()=>{
    console.log("Successfully connected to database");
    }
 ).catch((err)=>{
    console.log("Error connecting to database");
 });


 const app = express();
 app.use(express.json());

 app.set('view engine','pug');
 app.set('views','./views');


 app.use(cors({
     origin:"*"
 }))

 app.use("/cart",cartRoutes);
 app.use("/orders",orderRoutes);
 app.use("/products",productRoutes);
 app.use("/users",usersRoutes);


app.use((req,res,next)=>{
   next(new AppError(404,`Can not find ${req.originalUrl} on this server`))
})

app.use((err,req,res,next)=>{
   console.log(err);
   res.status(err.statusCode || 500).json({

      status:"error",
      message: err.message || "Something went wrong"
   })
})

 const port = 3000;
 app.listen(port,()=>{
    console.log(`server started successfully on port ${port}`);
 })