const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
const dbConnect=require("./config/db");
const bookRoutes=require("./routes/bookRoutes");
const PORT=process.env.PORT || 3000;
dbConnect();
app.use("/api",bookRoutes);
app.listen(PORT,()=>{
    console.log("App is running in port no:",PORT);
})