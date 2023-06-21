import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDB/connect.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

// should define after cors
// post routes prefix 
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on the port ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
}

start();