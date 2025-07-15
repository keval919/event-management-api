const db=require("../models/db")
const query=require("../models/query")

const registerEvent=async (req,res)=>{
    const {user_id,event_id}=req.body
    if(!user_id || !event_id){
        return res.status(400).json({
            error:"User and Event id required"
        })
    }
    try{
        const result=await db.query(query.registration.eventRegistration,[user_id,event_id])
        return res.status(200).json({
            message:"You are registered for event",
            data:result[0]
        })
    }
    catch(err){
        return res.status(500).json({
            error:err
        })
    }
}

module.exports=registerEvent