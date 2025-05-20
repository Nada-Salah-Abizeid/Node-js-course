const productModel = require("../models/products");
const userModel = require("../models/users");
const AppError = require("../utils/AppError");
const { CatchAsync } = require("../utils/CatchAsync");

const getByProductName = CatchAsync(async (req, res, next) => {
  const { name } = req.params;
  let products = await productModel.find({ name: name });
  if (!products || products.length == 0) {
    next(new AppError(400, "Product not found"));
  }
  res.status(200).json({
    status: "success",
    data: products,
  });
});

const getBySellerName = CatchAsync(async (req, res, next) => {
  const { sellerName } = req.params;
  let sellers = await userModel.find({
    role: "seller",
    $or: [
      { firstName: { $regex: sellerName, $options: "i" } },
      { lastName: { $regex: sellerName, $options: "i" } }
    ]
  });
  if (!sellers || sellers.length == 0) {
    next(new AppError(400, "Seller not found"));
  } else {
    const sellerIds = sellers.map((seller) => seller._id);
    let products = await productModel.find({ sellerId: { $in: sellerIds } }).populate("sellerId", "firstName lastName ");;
    if (!products || products.length === 0) {
      next(new AppError(400, "Seller has no products"));
    }
    res.status(200).json({
      status: "success",
      data: products,
    });
  }
});

const createProduct = CatchAsync(async (req, res, next) => {
  let Product = req.body;
  Product.sellerId = req.id;
  let products = await productModel.create(Product);
  res.status(201).json({
    status: "Success",
    data: products,
  });
});

const getAll = CatchAsync(async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 0;
  let skip = parseInt(req.query.skip) || 0;

  let products = await productModel
    .find()
    .populate("sellerId")
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    status: "Success",
    data: products,
  });
});

const getById = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  let product = await productModel.findOne({ _id: id });
  if (product) {
    res.status(200).json({
      status: "success",
      data: product,
    });
  } else {
    next(new AppError(400, "product not found"));
  }
});

const update = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  let product = await productModel.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );
  if (product) {
    res.status(200).json({
      status: "success",
      data: product,
    });
  } else {
    next(new AppError(400, "product not found"));
  }
});

const remove = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  let product = await productModel.findByIdAndDelete(id);

  if (product) {
    res.status(200).json({
      status: "success",
    });
  } else {
    next(new AppError(400, "product not found"));
  }
});

const getBySellerId= CatchAsync(async (req, res, next) => {
  const sellerId = req.id;
    let products = await productModel.find({ sellerId:  sellerId  }).populate("sellerId", "firstName lastName ");;
    if (!products || products.length === 0) {
      next(new AppError(400, "Seller has no products"));
    }
    res.status(200).json({
      status: "success",
      data: products,
    });
  });

module.exports = {
  getByProductName,
  getBySellerName,
  createProduct,
  getAll,
  getById,
  update,
  remove,
  getBySellerId
};
