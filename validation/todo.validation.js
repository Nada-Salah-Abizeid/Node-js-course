const Joi =require('joi');

exports.todoSchema =Joi.object({
        title:Joi.string().required(),
        status:Joi.string().valid('To-do','In progress','Done').default('To-do'),
    })


    