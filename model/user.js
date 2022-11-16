/* Autor: Cortez Ramirez Jose Kevyn
    Fecha: Noviembre 2020*/
var mongoose = require("mongoose");
const Schema = mongoose.Schema;


var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }

});

module.exports = mongoose.model('user', userSchema);