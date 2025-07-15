const db=require("../models/db")
const query=require("../models/query")
const maxEventRegistration=parseInt(process.env.MAX_EVENT_REGISTRATIONS)

// for /event-registration
const registerEvent=async (req,res)=>{
    const {user_id,event_id}=req.body
    if(!user_id || !event_id){
        return res.status(400).json({
            error:"User and Event id required"
        })
    }
    const eventTime=await db.query(query.events.eventTime,[event_id])
    if(new Date(eventTime).getTime()<=new Date().getTime()){
        return res.status(404).json({
            message:"Event registration ended"
        })
    }
    
     const client=await db.connect()
    try{
         await client.query("BEGIN")

        const isEventHasSpace=await client.query(query.events.checkRegistrationCount,[event_id,maxEventRegistration])
         if(isEventHasSpace.rowCount){

            const result=await client.query(query.registration.createRegistration,[user_id,event_id])
            await client.query(query.events.increaseCount,[event_id])
            
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
        if(err.code==="23505"){
            return res.status(409).json({
            error:"User is Already Registered to this event"
        })
        }
        if(err.code==="23503"){
            return res.status(404).json({
            error:"User is not registered"
        })
        }
        return res.status(500).json({
            error:err
        })
    }
    finally{
        client.release()
    }
}

// for /cancel-registration/:event_id
const cancelRegistration=async (req,res)=>{
    const event_id=req.params.event_id
    const {user_id}=req.body

    if(!user_id){
        return res.status(400).json({
            message:"User id required"
        })
    }
    const client=await db.connect()
    try{
        await client.query("BEGIN")
        const result=await client.query(query.registration.cancelRegistration,[event_id,user_id])

        if(!result.rowCount){
            return res.status(404).json({
            message:"No registration found to cancer"
        })
        }
        await client.query(query.events.decreaseCount,[event_id])
        client.query("COMMIT")
        res.status(200).json({
            message:"Registration Cancelled successfully"
        })
    }
    catch(err){
        client.query("ROLLBACK")
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    finally{
        client.release()
    }
}

const registration={
    registerEvent,
    cancelRegistration
}

module.exports=registration