const express=require("express");
const router=express.Router();
const {AddNewBook,updateStatus,getBooks}=require("../controllers/bookController");
router.post("/books",AddNewBook);
router.patch("/books/:id",updateStatus);
router.get("/books",getBooks);
module.exports=router;