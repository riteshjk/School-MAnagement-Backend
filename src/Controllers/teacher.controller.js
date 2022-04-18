const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const authorization = require("../middleware/authorization")
const Teacher = require('../models/teacher.model');

router.get('/', async(req, res) => {
    try {
        const teachers = await Teacher.find().lean().exec();
        res.status(200).send(teachers);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("", authenticate, authorization(["admin"]), async(req,res)=>{
    try{
        const teacher = await Teacher.create(req.body);
        res.status(200).send(teacher);
    }
    catch(err){
        res.status(500).send(err);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).lean().exec();
        res.status(200).send(teacher);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports=router;