import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const MONGOURL = process.env.MONGO_DB_URL;


mongoose.connect(MONGOURL).then(()=>{
    console.log("DB CONNECTED");
}).catch((Error)=>{
    console.log(Error);
    
})