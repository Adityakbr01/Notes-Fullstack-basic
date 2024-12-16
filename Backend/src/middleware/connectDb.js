require("dotenv").config();
const { default: mongoose } = require("mongoose");


const MONGOURL = process.env.MONGO_DB_URL;


//mongoDb.connect
const ConnectDb = ()=>{
    mongoose
    .connect(MONGOURL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
}







module.exports = ConnectDb;