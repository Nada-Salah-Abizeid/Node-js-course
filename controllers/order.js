const orderModel = require("../models/order");
const AppError = require("../utils/AppError");
const { CatchAsync } = require("../utils/CatchAsync");

const createOrder = CatchAsync(async (req, res, next) => {
  const { Products, paymentMethod } = req.body;
  if (!Products || !Array.isArray(Products) || Products.length === 0) {
    return next(new AppError(400, "No products provided."));
  }
  let totalPrice = 0;
  Products.forEach((p) => {
    totalPrice += p.quantity * p.price;
  });
  const order = await orderModel.create({
    userId: req.id,
    Products,
    totalPrice,
    paymentMethod,
  });
  res.status(200).json({
    status: "Success",
    data: order,
  });
});

const getAll = CatchAsync(async (req, res, next) => {
  let order = await orderModel.find().populate("userId");

  res.status(200).json({
    status: "Success",
    data: order,
  });
});

const update = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  let order = await orderModel.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (order) {
    res.status(200).json({
      status: "success",
      data: order,
    });
  } else {
    next(new AppError(400, "order not found"));
  }
});

const remove = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  let order = await orderModel.findByIdAndDelete(id);

  if (order) {
    res.status(200).json({
      status: "success",
    });
  } else {
    next(new AppError(400, "order not found"));
  }
});

module.exports = { createOrder, getAll, update, remove };
