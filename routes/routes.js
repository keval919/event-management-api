const express=require("express")
const user=require("../controllers/user")
const event=require("../controllers/event")
const registration=require("../controllers/registration")
const listEvents=require("../controllers/list_events")
const routes=express.Router()

routes.use(express.urlencoded({extended:true}))
routes.use(express.json())

routes.route("/user").post(user.createUser)                       //create user
routes.route("/create-event").post(event.createEvent)             //create event
routes.route("/event-registration").post(registration.registerEvent)   //user register for event
routes.route("/get-event/:id").get(event.getEventData)                 //fetch event data by event id
routes.route("/event-stats/:id").get(event.eventStats)                 //get event statics like total,remaining and percentage of registration capacity by event id
routes.route("/cancel-registration/:event_id").delete(registration.cancelRegistration)       //cancel registration by event id in url and user_id in body

routes.route("/upcoming-events/future-events").get(listEvents.futureEvents)                   //get future events
routes.route("/upcoming-events/by-alphabetic-order").get(listEvents.byAlphabeticLocation)     //list of events base on location alphabeticaly
routes.route("/upcoming-events/by-ascending-date").get(listEvents.byAscendingTime)            //list of events base on time in ascending order

module.exports=routes