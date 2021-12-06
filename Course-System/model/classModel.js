const {Schema, model} = require('mongoose');

const classSchema = new Schema({
    title: String,
    start: {type: Date, default: Date.now()},
    end: {type: Date, expires: '2m', default: Date.now()},
    type: String,
    participants: [{type: Schema.ObjectId, ref: 'Student'}]
});

module.exports = model('Class', classSchema);