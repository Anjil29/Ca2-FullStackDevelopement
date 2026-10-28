const mongoose=require("mongoose");
const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connection successful"))
    .catch((err)=>console.log("Error while connecting to database"))
}
module.exports=dbConnect;

