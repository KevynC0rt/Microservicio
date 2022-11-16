
/* Autor: Cortez Ramirez Jose Kevyn
    Fecha: Noviembre 2020*/
const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://Kevyn_Cortez:jkcr2401@cluster0.we2i6.mongodb.net/?retryWrites=true&w=majority";
const InitiateMongoServer = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        });
        console.log("Conectado a la BD !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};
 
module.exports= InitiateMongoServer;
