const express=require("express")
const user=require("../controllers/user")
const event=require("../controllers/event")
const registration=require("../controllers/registration")
const routes=express.Router()

routes.use(express.urlencoded({extended:true}))
routes.use(express.json())

routes.route("/user").post(user)
routes.route("/create-event").post(event)
routes.route("/event-registration").post(registration)

module.exports=routes