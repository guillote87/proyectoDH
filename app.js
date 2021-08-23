const express = require("express")
app = express()
const path = require("path")

const publicPath = path.resolve(__dirname, "./public")

app.use(express.static(publicPath))



app.listen(process.env.PORT||3000, ()=>{
    console.log('Servidor funcionando');
});

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("./views/index.html"))
})
app.get("/register",(req,res)=>{
    res.sendFile(path.resolve("./views/register.html"))
})

app.get("/productDetail",(req,res)=>{
    res.sendFile(path.resolve("./views/productDetail.html"))
})

app.get("/login", (req,res)=>{
    res.sendFile(path.resolve("./views/login.html"))
})

app.get("/productCart",(req,res)=>{
    res.sendFile(path.resolve("./views/productCart.html"))
})


