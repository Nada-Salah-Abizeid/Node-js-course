const express= require("express");
const router= express.Router();
const {getByProductName,getBySellerName, createProduct, getAll, getById, update, remove, getBySellerId} = require("../controllers/products");
const {auth,restrictTo} = require('../middlewares/auth') ;

router.get("/search/productName/:name",auth,restrictTo('user'),getByProductName);
router.get("/search/sellerName/:name",auth,restrictTo('user'),getBySellerName);
router.post("/",auth,restrictTo('seller'),createProduct);
router.get("/", auth, restrictTo('user'), getAll);
router.get("/:id", auth, restrictTo('user'), getById);
router.get("/seller",auth,restrictTo('seller'),getBySellerId);
router.patch("/:id",auth,restrictTo('seller'),update);
router.delete("/:id",auth,restrictTo('seller'),remove);



module.exports= router;