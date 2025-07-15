const db=require("../models/db")
const query=require("../models/query")

const createEvent=async (req,res)=>{
    const {title,description,date,location,user_id}=req.body
    if(!title || !description || !date || !location || !user_id){
        return res.status(400).json({
            error:"All fields are required"
        })
    }
    try{
        const result=await db.query(query.events.createEvent,[title,description,date,location,user_id])
        return res.status(200).json({
            message:"Event Created Sucessfully",
            data:result[0]
        })
    }
    catch(err){
        return res.status(500).json({
            error:"Fail to create event",
            a:err
        })
    }
}

module.exports=createEvent