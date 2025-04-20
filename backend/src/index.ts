import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import {  registerRouter } from "./routes/registerRouter";
import { loginRouter } from "./routes/loginRouter";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import { addJobRouter } from "./routes/addJob.router";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTON_STRING as string)
  .then(() => console.log("database connected successfully"));

// mongoose.set('debug', true);

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);
app.use(cookieParser());
cloudinary.config({ 
  cloud_name: "zainmughal999", 
  api_key:"744766614756274", 
  api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8"
});
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(cookieParser());
// app.use(bodyParser());

app.use(express.urlencoded({ extended: true }));
app.use("/api", registerRouter);
app.use("/api", loginRouter);
// app.use("/api", addJobRouter);
// app.use("/api", adminRegisterRouter);
// app.use("/api", adminLoginRouter);

app.listen(PORT, () => {
  console.log(`app is listeining  at ${PORT}`);
});
