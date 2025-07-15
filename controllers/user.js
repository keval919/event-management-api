const db=require("../models/db")
const query=require("../models/query")
const createUser=async (req,res)=>{
    const {name,email}=req.body;
    if(!name || !email){
        return res.status(400).json({
            error:"Name and Email are required"
        })
    }
    try{
        const result=await db.query(query.user.createUser,[name,email]);
        return res.status(201).json(result.rows[0]);
    }
    catch(err){
        if(err.code==="23505"){
            return res.status(409).json({error:"Email already exist"})
        }
        res.status(500).json({
            error:err.message
        })
    }
}

module.exports=createUser