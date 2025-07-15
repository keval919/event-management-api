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
            event_id:result[0].event_id
        })
    }
    catch(err){
        return res.status(500).json({
            error:"Fail to create event",
            a:err
        })
    }
}

const getEventData= async (req,res)=>{
    const event_id=req.params.id
    if(!event_id){
        return res.status(404).json({
            message:"Event ID is blank"
        })
    }
    try{
        const eventData=await db.query(query.events.getEventByID,[event_id])
        if(!eventData){
            return res.status(404).json({
                message:"No event exist with this ID"
            })
        }
        const registrys=await db.query(query.registration.getRegisteredUsers,[event_id])
        const users=[]
        for(const registry of registrys.rows){
            let user=await db.query(query.users.getUser,[registry.user_id])
            users.push(user.rows[0])
        }
        return res.status(200).json({
            eventData:eventData.rows,
            userData:users
        })
    }
    catch(err){
        res.status(500).json({
            message:"Enternal Server Error",
            err
        })
    }
}


const event={
    createEvent,
    getEventData
}

module.exports=event