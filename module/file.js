 const mongoose = require('mongoose')

 const fileScheme = new mongoose.Schema({
    filename: String,
    url:String
 })

 const File =mongoose.model('File',fileScheme);

 module.exports= File