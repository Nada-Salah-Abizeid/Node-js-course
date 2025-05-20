const Joi =require('joi');

exports.productSchema =Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required().min(15),
        photo: Joi.string().required()
    })


