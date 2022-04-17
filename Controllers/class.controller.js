const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const authorization = require("../middleware/authorization")

const Class = require('../models/class.model');

router.get('/', async(req, res) => {
    try {
        const classes = await Class.find().populate("teacher_id").lean().exec();
        res.status(200).send(classes);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("",authenticate, authorization(["admin"]),async(req,res)=>{
    try{
        const classes = await Class.create(req.body);
        res.status(200).send(classes);
    }
    catch(err){
        res.status(500).send(err);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const classes = await Class.findById(req.params.id).populate("teacher_id").lean().exec();
        res.status(200).send(classes);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports=router;