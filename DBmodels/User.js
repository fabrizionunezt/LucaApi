const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scoreFire: Number,
    scorePolice: Number,
    scoreFlower: Number
});
module.exports = mongoose.model('Users',UserSchema);