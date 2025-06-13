 const express = require("express");
 const router=express.Router();
 const {add,get,update,remove} = require('../controllers/cart');
 const {auth,restrictTo} = require('../middlewares/auth') ;
 const { cartSchema } = require("../validation/cart.validation");
 const { validate } = require("../middlewares/validate");

 router.post("/",auth,restrictTo('user','admin'),validate(cartSchema),add);

 router.get("/",auth,restrictTo('admin','user'),get);
 
 router.patch("/",auth,restrictTo('admin','user'),update);
 
 router.delete("/",auth,restrictTo('admin','user'),remove);
 

 module.exports= router;