const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoConnection } = require("./databases");
const router = require("./routes");
const morgan = require("morgan");
const helmet=require("helmet")
dotenv.config();
const path=require("path")
const multer=require('multer');
const app = express();
console.log("dirname",__dirname)
app.use('/images',express.static(path.join(__dirname,"public/images")))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"))
app.use(helmet())
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log("name",req.body)
    console.log("requestBody",req)
    console.log("filee",file)
    if (file.originalname) {
      cb(null, file.originalname);

    } else {
      cb(new Error("Missing file name in the request body"));
    }
  },
});
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
return res.status(200).json("File Uploaded successfully")
  }
  catch(err){
    console.log(err)
  }
})
MongoConnection();
app.use('/api',router)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is listening at",PORT);
});

module.exports=app