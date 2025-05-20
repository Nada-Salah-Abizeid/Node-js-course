const mongoose = require('mongoose');

const cartSchema= mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required:[true,"Cart owner must be provided."],
    },
    items:[{
        itemId:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Product',
            required:true,
        },
        quantity:{
            type: Number,
            required:true,
            min:1,
            default:1,
        },
        price:{
            type: Number,
            required:true,
            default:0,
        }
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    }
},{
    timestamps: true
})

const cartModel=mongoose.model('Cart',cartSchema);
module.exports=cartModel;