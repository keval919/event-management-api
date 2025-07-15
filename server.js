const express=require("express")
require("dotenv").config();
const routes=require("./routes/routes")
const app=express()

const port=process.env.PORT || 45455

app.use("",routes)

app.listen(port,()=>{
    console.log(`Server runs on -> http://127.0.0.1:${port}`)
})