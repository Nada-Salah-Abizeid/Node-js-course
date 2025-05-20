const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name must be provided."],
    },
    description:{
        type:String,
        required:[true,"Product description must be provided."],
        minLength:[15,'Product description must be at least 8 characters.'],
    },
    photo:{
        type:String,
        required:[true,"Product photo must be provided."],
    },
    sellerId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required:[true,"Product seller must be provided."],
    }
},{
    timestamps: true
})

const productModel=mongoose.model('Product',productSchema);
module.exports=productModel;