 const express = require("express");
 const cors=require('cors');
 const todosRoutes=require("./routes/todos");
 const usersRoutes=require("./routes/users");
 const mongoose=require("mongoose");
 const todoModel=require('./models/todos');
const AppError = require("./utils/AppError");
const status = require("statuses");
const multer= require("multer");


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + uniqueSuffix+"-"+file.originalname)
   }
 })

const upload=multer({storage:storage})

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

 app.get('/todosView',async (req,res)=>{
   let todos = await todoModel.find()
   res.render('todos',{todos})
})

 app.use(cors({
     origin:"*"
 }))

 app.use("/todos",todosRoutes);
 app.use("/users",usersRoutes);


 app.post('/profile', upload.single('avatar'), function (req, res, next) {
   res.send("Uploaded Successfully") 
 })

 
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