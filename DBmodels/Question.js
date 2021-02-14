const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    idSubject: String,
    idAuthor: String,
    title: String,
    details: String,
    registerDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Question', QuestionSchema);