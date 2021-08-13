const express = require("express")
app = express()
const path = require("path")

const publicPath = path.resolve(__dirname, "./public")

app.use(express.static(publicPath))



app.listen(3000,()=>{
    console.log ("Servidor Iniciado en puerto 3000")
})

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("./views/index.html"))
})

app.get("/productDetail",(req,res)=>{
    res.sendFile(path.resolve("./views/productDetail.html"))
})

app.get("/login", (req,res)=>{
    res.sendFile(path.resolve("./views/login.html"))
})


