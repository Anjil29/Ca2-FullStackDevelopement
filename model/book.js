const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        
    },
    category:{
        type:String,
      
    },
    status:{
        type:String,
        enum:["Available","Not Available"],
        default:"Available"
    }
},{
    timestamps:true
});
const Book=mongoose.model("Book",bookSchema);
module.exports=Book;