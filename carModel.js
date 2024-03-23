const mongoose = require('mongoose');

const CarSchme = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    namSX: {
        type: Number
    },
    hang: {
        type: String,
        required: true
    },
    gia: {
        type: Number
    }
});

const CarModel = new mongoose.model('car', CarSchme);

module.exports = CarModel;

