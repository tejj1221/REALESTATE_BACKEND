const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const property=require("./routes/propertyroute")
const user=require('./routes/userReg')
const cors=require("cors")
const app=express()
const port=process.env.PORT||8080 
app.use(cors()) 
app.listen(port,()=>console.log(`app is listening at${port}`))
mongoose.connect('mongodb+srv://sivateja:tejj1221@cluster0.xaxtzs7.mongodb.net/?retryWrites=true&w=majority',err=>{
    if(err){
        console.log("connection failed")
    }else{
        console.log("connected to database")
    }
})

app.use(bodyparser.json())
app.use("/property",property) 
app.use("/users",user)
app.get("/",(req,res)=>{
    res.send("shgdiskan")
})