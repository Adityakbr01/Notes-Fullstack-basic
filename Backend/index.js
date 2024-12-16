require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const app = express();
const EbookRoutes = require("./src/routes/EbookRoutes");
const ConnectDb = require("./src/middleware/connectDb")
const isAuthenticated = require("./src/routes/isAuthenticated")

const cors = require("cors");
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const alloOrigin = "http://localhost:5173"

app.use(cors({
  origin:alloOrigin,
  credentials: true  // allow cookies from other origins
}));
app.use(cookieParser())

//connect db
ConnectDb()


cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.cloudnaryAPIKEY,    
  api_secret: process.env.cloudnaryAPISECRET  
});



app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/ebooks", EbookRoutes);
app.use("/api/v1/",isAuthenticated)

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}...`);
});
