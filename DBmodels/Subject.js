const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name: String,
    description: String
});
module.exports = mongoose.model('Subject',SubjectSchema);