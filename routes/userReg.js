
const express=require("express")
const bcrypt = require('bcrypt');
const router=express.Router()
const user=require("../models/usermodel")
const jwt = require('jsonwebtoken');
const { route } = require("./propertyroute");
const secret="sugar"

router.post("/register",async( req,res)=>{


    try{ 
        const {MailID,password}=req.body
        console.log(req.body)  
        const check=async()=>{
        const chekdata=await user.findOne({MailID})
        
            if(chekdata!=null){
                return res.status(400).json({
                    status:"error",
                    message:"User is already registerd  "

                })
            } else{
                bcrypt.hash(password,10, async function(err,hash){
                    if(err){
                     return res.status(500).json({
                          status:"failed",
                          message:err.message
                      })
                    }
                  const data=await user.create({MailID,password:hash})
                  //console.log(data)
             
                  res.status(200).json({ 
                                        status:"success",
                                        message:"Registration sucessfull"  
                      
                                     })  
          
                  })  
                
            }  
        }      
        check()
    }
    catch(e){
       res.status(500).json({
           message:"e.message"
       })
   
    }
   })

   router.post("/login", async(req,res)=>{
    try{
        
      const {userid,password}=req.body
    //   console.log(password)
      const data= await user.findOne({MailID:userid})
      //console.log(data)
    //   console.log(data.password)

      if(!data){
        return res.status(400).json({
            status:"failed",
            message:"User is not registered"

        })
      }else{
      bcrypt.compare(password,data.password,function(err,result){
        if(err){
            res.status(500).json({
                status:"failed",
                message:err.message
            })
        }else{
            if(result){

                //token part is doing here
            const token= jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data._id
                  }, secret);
                //   console.log(token)







               return res.status(200).json({
                    status:"Success",
                    message:"details matched",
                    token,
                    id:data._id
                })
            }
                else{
                    return res.status(200).json({
                        status:"error",
                        message:"password is incorrect"
                    })
                    

                }
    }
      })
    }
    }
    catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports=router