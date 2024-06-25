import express from "express"
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import journalRoute from "./routes/journalRoute.js"
import bodyParser from 'body-parser';
import cors from "cors";
dotenv.config({
    path:".env"
})
databaseConnection();
const app = express();

// middleware

app.use(express.urlencoded({
    extended:true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));


// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/journal",journalRoute);
 

app.listen(process.env.PORT , ()=>{
    console.log(`Server listen at port ${process.env.PORT}`);
})