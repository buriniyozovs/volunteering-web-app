const express = require('express');
const router = express.Router();
const { Organizer, validate} = require('../models/organizer');

router.get('/', async (req, res)=>{
    const organizers = await Organizer.find().sort('name');
    res.send(organizers);
});

router.get('/:id', async (req, res)=>{
    const organizer = await Organizer.findById(req.params.id);
    if(!organizer) return res.status(404).send('Organizer not found!');

    res.send(organizer);
});

// router.post('/', async (req, res)=>{
//     const { error } = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const organizer = new Organizer({
//         name: req.body.name,
//         contacts: req.body.contacts
//     })
//     await organizer.save();

//     res.send(organizer);
// });

// router.put('/:id', async (req, res)=>{
//     const { error } = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const organizer = await Organizer.findByIdAndUpdate(req.params.id,
//         {
//             name: req.body.name,
//             contacts: req.body.contacts
//         }, {new: true});
//     if(!organizer) return res.status(404).send('Organizer not found!');

//     res.send(organizer);
// });

// router.delete('/:id', async (req, res)=>{
//     const organizer = await Organizer.findByIdAndRemove(req.params.id);
//     if(!organizer) res.status(404).send('Organizer not found!');
//     res.send(organizer);
// });


module.exports = router;