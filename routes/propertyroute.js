const { request } = require("express");
const express=require("express")
const blogs=require("../models/formmodel")
const jwt=require("jsonwebtoken");
const user=require("../models/usermodel")
const route=express.Router();
const secret="sugar"
module.exports=route
var i=354353;
route.post("/add",async(req,res)=>{
    try{
        //token authentication & add
        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:err.message
                })
            }else{
                   try{ const data=await user.findOne({_id:decoded.data})
                    if(data){
                        await blogs.create({...req.body,ppdid:i++})
                        return res.status(200).json({
                            message:"success"
                        })

                    }else{
                        return res.status(404).json({
                            status:"error",
                            message:"failed"})

                    }}
                    catch(e){
                        return res.status(404).json({
                            status:"error",
                            message:e.message
                        })
                    }
            }
            
          });
      
    }catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })
    }
})
route.get("/" ,async(req,res)=>{

    try{
        //token authoentication &find 
        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:err.message
                })
            }else{
                    const data=await user.findOne({_id:decoded.data})
                //       console.log(data)
                    if(data){
                             const info = await blogs.find().sort({date:-1});
                             res.status(200).send(info);
                            }else{
                                return res.status(404).json({
                                    status:"error",
                                    message:"failed"})
                            }
                        }

                    })
    }catch(e){
        res.status(400).json({
            erroe:e.message
        })
    }
})

route.put("/" ,async(req,res)=>{

    try{

        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:err.message
                })
            }else{
                const data=await user.findOne({_id:decoded.data})
                if(data){
                try{
          //          console.log(req.body)
                    const info = await blogs.updateOne(req.body, {$set:{status:"Sold" , days:0}});
            
             res.status(200).json({status: "succes", message:"status is updated"})
            }catch(e){
                res.status(400).json({
                    mesage:e.message
                })
            }}else{
                res.status(400).json({
                    message:"token not matched"
                })
            }
        }
        })


       
      
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})