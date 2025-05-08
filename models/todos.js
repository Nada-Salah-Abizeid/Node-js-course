const mongoose=require('mongoose');

const todosSchema= mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title must be provided."],
        unique:[true,"Title must be unique."],
        trim:true,
        minLength:[5,'Title must be at least 5 characters.'],
        maxLength:[20,'Title must be at most 20 characters.']
    },
    status:{
        type:String,
        enum:['To-do','In progress','Done'],
        default:'To-do'
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }},
    {
        timestamps: true
})
const todoModel=mongoose.model('Todo',todosSchema);
module.exports=todoModel;
