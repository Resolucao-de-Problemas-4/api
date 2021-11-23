const express = require('express')
const server = express()

server.get('/', (req,res ) =>{

    return res.json({mensagem:'Nossa api tá rodano'})
});

server.listen(3000, () =>{
    console.log('Server on')
});