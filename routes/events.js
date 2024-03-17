const express = require('express');
const router = express.Router();
const { Event, validate } = require('../models/event');
const {User} = require('../models/user');
const auth = require('../middleware/auth');

router.get('/', async (req, res) =>{
    const events = await Event.find().sort('name');
    res.send(events);
});

router.get('/:id', async (req, res)=>{
    const event = await Event.findById(req.params.id);
    if(!event) return res.status(404).send('Event not found!');

    res.send(event);
});

router.post('/', auth, async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const organizer = await User.findById(req.user._id).select('-password');
    if(!organizer) return res.status(404).send('Organizer not found!');

    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        organizer: {
            _id: organizer._id,
            name: organizer.name,
            email: organizer.email,
            phoneNumber: organizer.phoneNumber,
        }
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

router.put('/:id', auth, async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const organizer = await User.findById(req.user._id).select('-password');
    if(!organizer) return res.status(404).send('Organizer not found!');

    let event = await Event.findById(req.params.id);
    if(!event) return res.status(404).send('Event not found!');
    if(event.organizer._id.toString() !== organizer._id.toString()) return res.send('cannot update');
    
    try {
        event.name = req.body.name
        event.date = req.body.date
        await event.save()
        res.send(event);

    } catch (error) {
        res.send(error)
    }
})

module.exports = router;