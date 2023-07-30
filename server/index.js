import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";



        // CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit : "30mb" , extended: true }));
app.use(bodyParser.urlencoded({ limit : "30mb" , extended : true }));
app.use(Cors());
           //to store iteams
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


          // FILESTORGE
const storage = multer.diskStorage({
      destination:function(req,res, cb){
            cb(null, "Public/assets");
      },
      filename: function (req,file, cb){
            cb(null, file.originalname);
      }
});
const upload = multer ({storage})

          //Database connected
try{
   await mongoose.connect('mongodb://localhost:27017/socialmedia')
      console.log("mongoconnected")
 } catch(err){
       console.log(err)
 }

      //Routes with files
app.post("/auth/register",upload.single("picture"),register)
app.post("/posts" , verifyToken , upload.single("picture") , createPost);
      //Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);   
app.use("/posts" , postRoutes);   

           //port
const port = process.env.PORT || 3002;
            //lister
const server = app.listen(port, () =>{
 console.log(`server is running in on port ${port}`)
})


