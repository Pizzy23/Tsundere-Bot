const express = require("express");

const server = express();
server.all("/",(req,res) =>{
    res.send("Bot On")
})
function keepAlive () {
    const PORT = process.env.PORT || 3001
    server.listen(PORT,() =>{
        console.log("-> Server Online : ",  PORT )
    })
}
module.exports = keepAlive()