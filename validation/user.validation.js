const Joi =require('joi');

exports.userSchema =Joi.object({
        username:Joi.string().required(),
        email:Joi.string().required().pattern(new RegExp("^[a-zA-Z]{3,8}(@)(gmail|yahoo)(.com)$")),
        password: Joi.string().required(),
        role:Joi.string().valid('admin','user','seller').default('user'),
        firstName: Joi.string().required(),
        lastName:Joi.string().required(),
    })

