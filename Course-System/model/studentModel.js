const {Schema, model} = require('mongoose');

const studentSchema = new Schema({
    fullname: {type: String, required: true},
    phone: String,
    address: String,
    job: String,
});

module.exports = model('Student',studentSchema)


