 const express = require("express");
 const router=express.Router();
 const {saveTodo,getAll,getById,update,remove} = require('../controllers/todos');
 const {auth,restrictTo} = require('../middlewares/auth') ;
 const { todoSchema } = require("../validation/todo.validation");
 const { validate } = require("../middlewares/validate");

//  route.use(auth);

 router.post("/",auth,restrictTo('admin'),validate(todoSchema),saveTodo);

 router.get("/",auth,restrictTo('admin','user'),getAll);

 router.get("/:id",auth,restrictTo('admin'),getById);
 
 router.patch("/:id",auth,restrictTo('admin'),update);
 
 router.delete("/:id",auth,restrictTo('admin'),remove);
 

 module.exports= router;