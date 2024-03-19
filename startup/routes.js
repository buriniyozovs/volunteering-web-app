const express = require('express');
const events = require('../routes/events');
const error = require('../middleware/error');
const users = require('../routes/users');
const organizers = require('../routes/organizers');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/events', events);
    app.use('/api/users', users);
    app.use('/api/organizers', organizers)
    app.use(error);
}