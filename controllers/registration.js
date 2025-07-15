const db=require("../models/db")
const query=require("../models/query")
const maxEventRegistration=parseInt(process.env.MAX_EVENT_REGISTRATIONS)

const registerEvent=async (req,res)=>{
    const {user_id,event_id}=req.body
    if(!user_id || !event_id){
        return res.status(400).json({
            error:"User and Event id required"
        })
    }
    
     const client=await db.connect()
    try{
         await client.query("BEGIN")

        const isEventHasSpace=await client.query(query.events.checkRegistrationCount,[event_id,maxEventRegistration])

         if(isEventHasSpace){

            const result=await client.query(query.registration.createRegistration,[user_id,event_id])
            
             client.query("COMMIT")
            res.status(200).json({
                message:"You are registered for event",
                data:result[0]
            })
        }
        else{
            db.query("COMMIT")
            res.status(400).json({
                message:"Event registrations are full"
            })
        }
    }
    catch(err){
        client.query("ROLLBACK")
        return res.status(500).json({
            error:err
        })
    }
    finally{
        client.release()
    }
}


const registration={
    registerEvent,
}

module.exports=registration