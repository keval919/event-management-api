const { json } = require("express")
const db=require("../models/db")
const query=require("../models/query")

// for /upcoming-events/future-events
const futureEvents= async (req,res)=>{
    try{
        const events=await db.query(query.events.getFutureEvents)
        if(!events.rowCount){
            return res.status(404).json({
            message:"No Events Found"
        })
        }
        return res.status(200).json({
            evens:events.rows
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//for /upcoming-events/by-alphabetic-order
const byAlphabeticLocation= async (req,res)=>{
    try{
        const events=await db.query(query.events.getLocationByAlphabeticorder)
        if(!events.rowCount){
            return res.status(404).json({
            message:"No Events Found"
        })
        }
        return res.status(200).json({
            evens:events.rows
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//for /upcoming-events/by-ascending-date
const byAscendingTime= async (req,res)=>{
    try{
        const events=await db.query(query.events.getByAscendingDate)
        if(!events.rowCount){
            return res.status(404).json({
            message:"No Events Found"
        })
        }
        return res.status(200).json({
            evens:events.rows
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

const listEvents={
    futureEvents,
    byAlphabeticLocation,
    byAscendingTime
}

module.exports=listEvents