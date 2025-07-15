const db=require("../models/db")
const query=require("../models/query")

//creating user

const createUser=async (req,res)=>{
    const {name,email}=req.body;
    if(!name || !email){
        return res.status(400).json({
            message:"Name and Email are required"
        })
    }
    try{
        const result=await db.query(query.users.createUser,[name,email]);
        return res.status(201).json(result.rows[0]);
    }
    catch(err){
        if(err.code==="23505"){
            return res.status(409).json({message:"Email already exist"})
        }
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const user={
    createUser
}

module.exports=user