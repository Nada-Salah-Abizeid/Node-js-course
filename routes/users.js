const express = require("express");
const router=express.Router();
const {saveUser,login,getAll,update,remove} = require('../controllers/users');
const {auth,restrictTo} = require('../middlewares/auth') ;
const { userSchema } = require("../validation/user.validation");
const { validate } = require("../middlewares/validate");


router.post("/",validate(userSchema),saveUser);

router.post("/login", login);

router.get("/",auth,restrictTo('admin','user'),getAll);

router.patch("/:id",auth,restrictTo('admin,user'),update);

router.delete("/:id",auth,restrictTo('admin,user'),remove);


module.exports= router;