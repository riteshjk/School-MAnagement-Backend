const express= require('express');
const connect = require('./config/db');
const app = express();
const { register, login } = require("./Controllers/auth.controller");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const port = process.env.PORT || 3000;

// // const cors = require("cors")
const teachercontroller = require("./Controllers/teacher.controller");
const classcontroller = require("./Controllers/class.controller");

app.use(express.json());
app.post(
    "/register",
    body("name").notEmpty().withMessage("Please Provide Valid first name"),
    body("email").notEmpty().isEmail().withMessage("Please Provide Valid email"),
    body("password").notEmpty().withMessage("Please Provide Valid last name"),
    register
  );
  app.post(
    "/login",
    body("name").notEmpty().withMessage("Please Provide Valid first name"),
    body("email").notEmpty().isEmail().withMessage("Please Provide Valid email"),
    body("password").notEmpty().withMessage("Please Provide Valid last name"),
    login
  );
  

// // app.use(cors())

app.use("/teacher", teachercontroller);
app.use("/class", classcontroller);
app.listen(port,async()=>{
    try{
        await connect();
        console.log(`Server started at port ${port}`);
    }
    catch(err){
        console.log(err)
    }
});






