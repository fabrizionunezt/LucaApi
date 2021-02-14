const mongoose = require('mongoose');

const QuestionAnswerSchema = mongoose.Schema({
    idUser: String,
    idQuestion: String,
    answer: String,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('QuestionAnswer',QuestionAnswerSchema);