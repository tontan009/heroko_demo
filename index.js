const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080


app.get("/", (req, res)=>{
    res.json('You Are In');
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Serer is running. ${PORT}`)
})