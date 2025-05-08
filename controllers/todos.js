const todoModel=require('../models/todos');
const AppError = require('../utils/AppError');
const { CatchAsync } = require("../utils/CatchAsync"); 

const saveTodo= CatchAsync(async(req,res,next)=>{
    let Tode= req.body;
    Tode.userId = req.id;
        let todos = await todoModel.create(Tode);
        res.status(200).json({
            status:"Success",
            data:todos
        })   
 }) 

 const getAll = CatchAsync(async(req,res,next)=>{ 
    let limit= parseInt(req.query.limit)||0;
    let skip= parseInt(req.query.skip)||0;
    
       let todos = await todoModel.find().populate('userId').limit(limit).skip(skip);
       res.status(200).json({
           status:"Success",
           data:todos
       })  
 }) 

 const getById= CatchAsync(async(req,res,next)=>{
    const {id} = req.params;  
        let todo = await todoModel.findOne({_id:id});

        if(todo){
           res.status(200).json({
               status:"success",
                data:todo
            })
        }else{
            next(new AppError(400,"todo not found"))
        }
   }) 

  const update= CatchAsync(async(req,res,next)=>{
    const {id} = req.params;  
    const body = req.body; 
    let todo;      

      if(body.title && body.status){
           todo = await todoModel.findByIdAndUpdate(id,{title:body.title , status:body.status},{new:true});
      }else if(body.title){
           todo = await todoModel.findByIdAndUpdate(id,{title:body.title},{new:true});
      }else if(body.status){
           todo = await todoModel.findByIdAndUpdate(id,{status:body.status},{new:true});
      }

      if(todo){
         res.status(200).json({
             status:"success",
              data:todo
          })
      }else{
          next(new AppError(400,"todo not found"))
      }
 }) 


 const remove=CatchAsync(async(req,res,next)=>{
    const {id} = req.params; 
        let todo = await todoModel.findByIdAndDelete(id);

        if(todo){
           res.status(200).json({
               status:"success"
            })
        }else{
            next(new AppError(400,"todo not found"))
        }   
 } 
) 


module.exports={saveTodo,getAll,getById,update,remove}