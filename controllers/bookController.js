const Book=require("../model/book");
const AddNewBook=async(req,res)=>{
    try{
        const title=req.body.title;
        if(!title || !title.trim()){
            return res.status(400).json({
                success:false,
                message:"PLease enter the title of the book"
            });
        }
        const newBook=await Book.create(req.body);
        return res.status(200).json({
            success:true,
            message:"New Book added successfully",
            newBook:newBook
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
const getBooks=async(req,res)=>{
    try{
       
        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;
        const santPage=page>1?page:1;
        const santLimit=limit<1?10:limit;
        const skip=(santPage-1)*santLimit;
        const [books,totalBooks]=await Promise.all([ Book.find().sort({createdAt:-1}).skip(skip).limit(santLimit),
            Book.countDocuments()
        ]);
        const totalPages=Math.ceil(totalBooks/limit);       
        if(books.length==0){
          return res.status(400).json({
            success:false,
            message:"books not found"
        })  
        }
        res.status(200).json({
            success:true,
            message:"Books retreived successfully",
            metadata:
            {
                totalPages,
                currentPage:page
            },
            totalRecords:totalBooks,
            books:books,
            
            
        });
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        });
    }
}
const updateStatus=async(req,res)=>{
    try{
        const newStatus=req.body.status;
        if(!newStatus){
            return res.status(400).json({
            success:false,
            message:"Please enter the status of the book"
        });
        }
        const book=await Book.findById(req.params.id);
        if(!book){
            return res.status(400).json({
            success:false,
            message:"No such entry of the book"
        });
        }
        book.status=newStatus;
        await book.save();
        return res.status(200).json({
            success:true,
            message:"New Book added successfully",
            book:book
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
};
module.exports={AddNewBook,updateStatus,getBooks};