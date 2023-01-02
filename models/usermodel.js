const mongoose=require("mongoose")
const studentSchema= mongoose.Schema({
    MailID:{
        required:true,
        type:String,
        unique: true
    },
    password:{
        required:true,
        type:String
    }
   
})
module.exports=mongoose.model("data",studentSchema)