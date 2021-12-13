const {Schema, model} = require('mongoose');


const studentSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: String,
    address: String,
    job: String,
});



module.exports = model('Student', studentSchema)


