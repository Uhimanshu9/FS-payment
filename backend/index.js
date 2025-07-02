const express = require("express");
const rootRouters = require("./routes/index");

const cors =require("cors")

const app =express()
app.use(cors())
app.use(express.json());

app.use("/api/v1", rootRouters);
app.get("/",(req,res)=>{
    res.send("Hello from backend")
}
)



app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})



