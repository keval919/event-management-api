const express=require("express")
const user=require("../controllers/user")
const event=require("../controllers/event")
const registration=require("../controllers/registration")
const routes=express.Router()

routes.use(express.urlencoded({extended:true}))
routes.use(express.json())

routes.route("/user").post(user.createUser)
routes.route("/create-event").post(event.createEvent)
routes.route("/event-registration").post(registration.registerEvent)
routes.route("/get-event/:id").get(event.getEventData)
routes.route("/event-stats/:id").get(event.eventStats)
routes.route("/cancel-registration/:event_id").delete(registration.cancelRegistration)

module.exports=routes