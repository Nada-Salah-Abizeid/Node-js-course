const cartModel=require('../models/cart');
const productModel= require('../models/products');
const AppError = require('../utils/AppError');
const { CatchAsync } = require("../utils/CatchAsync"); 

const add = CatchAsync(async (req, res, next) => {
    const { productId, quantity, price } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return next(new AppError(400, "Product not found"));
    }
    let cart = await cartModel.findOne({ userId: req.id }); 
    if (!cart) {
      cart = new cartModel({
        userId: req.id,
        items: [{ itemId: productId, quantity, price }],
        totalPrice: quantity * price
      });
    } else {
      const existingItem = cart.items.find(item => item.itemId.equals(productId));
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ itemId: productId, quantity, price });
      }
      cart.totalPrice += quantity * price;
    }
  
    const savedCart = await cart.save();
  
    res.status(200).json({
      status: "Success",
      data: savedCart
    });
  });
  

 

 const get = CatchAsync(async(req,res,next)=>{ 
    let limit= parseInt(req.query.limit)||0;
    let skip= parseInt(req.query.skip)||0;
    
       let cart = await cartModel.find().populate('userId').limit(limit).skip(skip);
       res.status(200).json({
           status:"Success",
           data:cart
       })  
 }) 


 const update = CatchAsync(async (req, res, next) => {
    const { id } = req.params; 
    const { productId, quantity } = req.body;
  
    let cart = await cartModel.findById(id);
    if (!cart) return next(new AppError(404, "Cart not found"));
  
    const item = cart.items.find(i => i.itemId.equals(productId));
    if (!item) return next(new AppError(404, "Item not found in cart"));
  
    cart.totalPrice -= item.quantity * item.price; 
    item.quantity = quantity;
    cart.totalPrice += item.quantity * item.price; 
  
    const updated = await cart.save();
  
    res.status(200).json({
      status: "success",
      data: updated
    });
  });


  const remove = CatchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { productId } = req.body;
  
    let cart = await cartModel.findById(id);
    if (!cart) return next(new AppError(404, "Cart not found"));
  
    const itemIndex = cart.items.findIndex(i => i.itemId.equals(productId));
    if (itemIndex === -1) return next(new AppError(404, "Item not in cart"));
  
    cart.totalPrice -= cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    cart.items.splice(itemIndex, 1);
  
    await cart.save();
  
    res.status(200).json({
      status: "success",
      message: "Item removed from cart"
    });
  });

module.exports={add,get,update,remove}