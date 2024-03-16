const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');

require('./startup/db')();
require('./startup/routes')(app);


app.get('/', (req, res)=>{
    res.send("Hello World!");
})




const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Listening in port ${port}`)});