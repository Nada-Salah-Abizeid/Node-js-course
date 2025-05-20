const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User ID must be provided."],
    },
    Products: [
      {
        productId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cashOnDelivery", "stripe", "paypal"],
      default: "cashOnDelivery",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
