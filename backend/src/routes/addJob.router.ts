import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { AddJob, AddJobTypes } from "../models/addJob.models";
import { User } from "../models/register.models";
// import {  imageUpload } from "../utils/cloudinary";

import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
// import { verifyToken } from "../middlewares/verifyToken";


// addJobRouter.post(
//   "/addJob",
//   verifyToken,
//   upload.single("imageFile"),

//   async (req: Request, resp: Response) => {
//     const imageBody = req.file as Express.Multer.File;
//     console.log("adJobImageBody", imageBody);
//     try {
//       const userId = req.userId;
//       console.log("id", userId);
//       if (!userId) {
//         resp.status(401).json({ message: "Unauthorized access" });
//         return;
//       }
//       // uploading image

//       const jobBody: AddJobTypes = req.body;
//       console.log("jobBody", jobBody);
//       if (!jobBody) {
//         resp.status(400).json({ message: "job body error" });
//       }
//       async function uploadImages(imageBody: Express.Multer.File) {
//       const b64 = Buffer.from(imageBody.buffer).toString("base64");
//       let dataURI = "data:" + imageBody.mimetype + ";base64," + b64;
//       const res = await cloudinary.uploader.upload(dataURI);
//        res.url;
//        console.log("url",res.url)
//       } 
// const imageUploaded =await  uploadImages(imageBody)
// // return imageUploaded
// console.log(imageUploaded)
//       jobBody.userId = req.userId;
//       // jobBody.imageFile=imageUploaded; 

//       const user = await User.findById(userId);
//       if (!user) {
//         resp.status(404).json({ message: "User not found" });
//         return;
//       }
//       if (user.role !== "admin") {
//         resp.status(403).json({ message: "Access denied. Admins only." });
//         return;
//       }
//       // jobBody.imageFiles= imageUpload;

//       const job = await AddJob.create(jobBody);

//       resp.status(200).send(job);
//     } catch (error) {
//       console.log(error);
//       resp.status(500).json({ message: "Something Went Wrong!" });
//     }
//   }
// );

// addJobRouter.post(
//   "/addJob",
//   authRoles("user"),
//   verifyToken,
//   async (req: Request, resp: Response) => {

//     try {
//       const jobBody: AddJobTypes = req.body;
//       console.log("jobBody", jobBody);
//       if (!jobBody) {
//         resp.status(400).json({ message: "job body error" });
//       }
//       jobBody.userId=req.userId;
//       const job = await AddJob.create(jobBody);

//       resp.status(500).send("not able to post");
//     } catch (error) {
//       console.log(error);
//       resp.status(500).json({ message: "Something Went Wrong!" });
//     }
//   }
// );


// Configure multer to store files in memory


export const addJobRouter = express.Router();

// Function to upload the image to Cloudinary


// Route to handle adding a job
addJobRouter.delete("/delete",async(req:Request,resp:Response)=>{
  
  try {
  const user = await User.deleteMany({userId:req.userId})  
  resp.status(200).json({user:user});
  
  } catch (error) {
    console.log(error);
    
  }
})

// addJobRouter.post(
//   "/allJobs/:id",
//   verifyToken,
//   async (req: Request, resp: Response) => {
//     const id = req.query.paramas?.includes;
//     console.log("id For update job", id);
//     try {
//       const allJobs = await AddJob.findById(id);
//       console.log("JOBS FOR UPDATE", allJobs);
//     } catch (error) {
//       console.log(error);
//       resp.status(500).json({ message: "Something Went Wrong!" });
//     }
//   }
// );
