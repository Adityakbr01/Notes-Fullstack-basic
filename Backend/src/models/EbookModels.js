const mongoose = require("mongoose");


const addEbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is mandatory
        trim: true      // Removes whitespace
    },
    image: {
        type: String,
        required: true  // Image URL or path is mandatory
    },
    pdfFile:{
        type: String,
        required: true  // Path to the PDF file is mandatory
    }
    ,description: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    }
},{timestamps:true})


const Ebook = mongoose.model("Ebooks",addEbookSchema);

module.exports = Ebook;