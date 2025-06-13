const Joi = require("joi");

exports.orderSchema = Joi.object({
  Products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  paymentMethod: Joi.string()
    .valid("cashOnDelivery", "stripe", "paypal")
    .default("cashOnDelivery"),
});
