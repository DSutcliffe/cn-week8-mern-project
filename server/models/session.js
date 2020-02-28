const mongoose = require('mongoose');

sessionSchema = new mongoose.Schema({
    expires: {type: Date, required: true},
    session: {type: String, require: true}
});

module.exports = mongoose.model('sessions', sessionSchema);