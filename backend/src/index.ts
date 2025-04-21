import express from "express";
import serverless from "serverless-http";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import {  registerRouter } from "../src/routes/registerRouter";


import { loginRouter } from "../src/routes/loginRouter";
import {v2 as cloudinary} from "cloudinary";

// Initialize app
const app = express();
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_CONNECTON_STRING as string)
  .then(() => console.log("database connected successfully"));

// Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL as string,
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: process.env.FRONTEND_URLNETLIFY  ||  "http://localhost:5173",
    credentials: true,
  })
);

// Cloudinary config
cloudinary.config({ 
  cloud_name: "zainmughal999", 
  api_key:"744766614756274", 
  api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8"
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", registerRouter);
app.use("/api", loginRouter);
// Export the serverless handler
const handler = serverless(app);
console.log("handler",handler);
export { handler };