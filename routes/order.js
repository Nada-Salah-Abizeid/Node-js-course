 const express = require("express");
 const router=express.Router();
 const { createOrder, getAll, update, remove } = require('../controllers/order');
 const {auth,restrictTo} = require('../middlewares/auth') ;
 const { orderSchema } = require("../validation/order.validation");
 const { validate } = require("../middlewares/validate");


 router.post("/",auth,restrictTo('admin,user'),validate(orderSchema),createOrder);

 router.get("/",auth,restrictTo('admin','user'),getAll);
 
 router.patch("/:id",auth,restrictTo('admin,user'),update);
 
 router.delete("/:id",auth,restrictTo('admin,user'),remove);
 

 module.exports= router;