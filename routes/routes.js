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


module.exports=routes