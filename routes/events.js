const express = require('express');
const router = express.Router();
const { Event, validate } = require('../models/event');

router.get('/', async (req, res) =>{
    const events = await Event.find().sort('name');
    res.send(events);
});

router.get('/:id', async (req, res)=>{
    const event = await Event.findById(req.params.id);
    if(!event) return res.status(404).send('Event not found!');

    res.send(event);
});

router.post('/', async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        contacts: req.body.contacts
    })
    try {
        await event.save();
        res.send(event);
    } catch (err) {
        console.error('Error saving event:', err);
        res.status(500).send('Could not save event');
    }

    // await event.save().catch(()=>{console.log('could not save')});
    // res.send(event);
});

router.delete('/:id', async (req, res)=>{
    const event = await Event.findByIdAndRemove(req.params.id);

    if(!event) return res.status(404).send('Event not found!');

    res.send(event);
});

router.put('/:id', async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const event = await Event.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        date: req.body.date,
        contacts: req.body.contacts
    }, {new: true});
    if(!event) return res.status(404).send('Event not found!');

    res.send(event);
})

module.exports = router;