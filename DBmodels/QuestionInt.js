const mongoose = require('mongoose');

const QuestionIntSchema = mongoose.Schema({
    idUser: String,
    liked: Boolean,
    disliked: Boolean,
    following: Boolean,
    idQuestion: String
});
module.exports = mongoose.model('QuestionInt',QuestionIntSchema);