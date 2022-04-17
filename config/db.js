const mongoose = require('mongoose');

const connect=()=>{
    return mongoose.connect("mongodb+srv://ritesh:ritesh123@cluster0.jbgoa.mongodb.net/school_model")
}

module.exports=connect;