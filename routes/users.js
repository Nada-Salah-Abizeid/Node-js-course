const express = require("express");
const router=express.Router();
const {saveUser,login,getAll,update,remove} = require('../controllers/users');
const {auth,restrictTo} = require('../middlewares/auth') ;
const { userSchema } = require("../validation/user.validation");
const { validate } = require("../middlewares/validate");


router.post("/",auth,restrictTo('admin'),validate(userSchema),saveUser);

router.post("/login", login);

router.get("/",auth,restrictTo('admin','user'),getAll);

router.patch("/:id",auth,restrictTo('admin'),update);

router.delete("/:id",auth,restrictTo('admin'),remove);


module.exports= router;