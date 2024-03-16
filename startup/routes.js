const express = require('express');
const events = require('../routes/events');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/events', events);
}