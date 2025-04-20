import express, { Request, Response } from "express";
import {  User } from "../models/register.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken";
import { v2 as cloudinary } from "cloudinary";

import { AddJob, AddJobTypes } from "../models/addJob.models";
import multer from "multer";
export type jobSearchResponse = {
  data: AddJobTypes[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
export async function uploadImages(
  imageBody: Express.Multer.File
): Promise<string> {
  try {
    // Convert the buffer to a base64 string
    const b64 = Buffer.from(imageBody.buffer).toString("base64");
    const dataURI = `data:${imageBody.mimetype};base64,${b64}`;

    // Upload the image to Cloudinary
    const res = await cloudinary.uploader.upload(dataURI);
    console.log("Cloudinary URL:", res.url);

    return res.url; // Return the URL from Cloudinary
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    throw new Error("Failed to upload image to Cloudinary");
  }
}
const loginRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});
loginRouter.post("/login", async (req: Request, resp: Response) => {
  const { email, password } = req.body;

  console.log("req.body/first/Login ", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) resp.status(400).json({ message: "Invalid Credentials!" });

    const isMatchPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isMatchPassword)
      resp.status(400).json({ message: "Invalid Credentials!" });
    const token = jwt.sign(
      { userId: user?.id, role: user?.role },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    console.log("role", user?.role);
    console.log(token);
    resp.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    resp.status(200).json({ userId: user?._id });
    console.log("userResponse", user);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something Went Wrong" });
  }
});

loginRouter.get(
  "/validate-token",
  verifyToken,
  async (req: Request, resp: Response) => {
    resp.status(200).send({ userId: req.userId });
  }
);

loginRouter.post("/logout", ( res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(200).json("user logged out");
});
//Get User Info
loginRouter.get(
  "/userInfo",
  verifyToken,
  async (req: Request, resp: Response) => {
    try {
      // Extract user ID from request
      const id = req.userId;
      // console.log("Fetching user with ID:", id);

      // Fetch user with selected fields
      const user = await User.findById(id).select(
        "email firstName lastName role imageFile"
      );

      // Handle case where user is not found
      if (!user) {
        resp.status(404).json({ message: "User not found with this ID" });
      }

      // Send successful response
      resp.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user data:", error);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  }
);
//Update User Info
loginRouter.put(
  "/UpdateUser",
  verifyToken,
  upload.single("imageFile"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, lastName } = req.body;
      // const Body:AddJobTypes = req.body;
      const userId = req.userId;

      if (!userId) {
        res.status(404).json({ message: "User ID not found" });
        return;
      }

      const updates: { firstName?: string; lastName?: string } = {};
      if (firstName) updates.firstName = firstName;
      if (lastName) updates.lastName = lastName;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (req.file) {
        const file = req.file as Express.Multer.File;
        const updatedImageUrl = await uploadImages(file);

        updatedUser.imageFile = updatedImageUrl;
        await updatedUser.save();
      }
      res.status(200).json({ user: updatedUser });
      return;
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

loginRouter.post(
  "/addJob",
  verifyToken,
  upload.single("imageFile"),
  async (req: Request, resp: Response) => {
    try {
      // Extract the uploaded image
      const imageBody = req.file as Express.Multer.File;
      console.log("Uploaded Image:", imageBody);

      if (!imageBody) {
        resp.status(400).json({ message: "No image file uploaded" });
      }

      // Get the authenticated user ID from the token
      const userId = req.userId;
      console.log("User ID:", userId);

      if (!userId) {
        resp.status(401).json({ message: "Unauthorized access" });
      }

      // Upload the image to Cloudinary and get the URL
      const imageUrl = await uploadImages(imageBody);

      // Prepare job body
      const jobBody: AddJobTypes = req.body;
      jobBody.userId = userId;

      jobBody.imageFile = imageUrl; // Save the uploaded image URL

      // Check if the user exists and is an admin
      const user = await User.findById(userId);
      if (!user) {
        resp.status(404).json({ message: "User not found" });
      }

      if (user?.role !== "admin") {
        resp.status(403).json({ message: "Access denied. Admins only." });
      }

      // Create a new job in the database
      const job = await AddJob.create(jobBody);
      console.log("job Posted", job);
      resp.status(200).json({ message: "Job added successfully!", job });
    } catch (error) {
      console.error("Error:", error);
      resp.status(500).json({ message: "Something went wrong!" });
    }
  }
);

loginRouter.get(
  "/allJobs",
  verifyToken,
  async (req: Request, resp: Response) => {
    try {
      const jobs = await AddJob.find({
        userId: req.userId,
      });

      resp.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      resp.status(500).json({ message: "Something Went Wrong!" });
    }
  }
);
loginRouter.get("/search", async (req: Request, resp: Response) => {
  try {
    // Construct the query
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      // case "starRating":
      //   sortOptions = { starRating: -1 }; //high to low  strRtaing
      //   break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 }; // from low to high
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
      case "salary_Asc":
        sortOptions = { salary: 1 };
        break;

      case "salary_Desc":
        sortOptions = { salary: -1 }; // High to low
        break;
    }
    // Pagination setup
    const pageSize = 2; // Number of items per page
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    ); // Current page
    const skip = (pageNumber - 1) * pageSize; // Skip items for pagination

    // Fetch matching jobs
    const searchJob = await AddJob.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    // Total matching jobs count
    const total = await AddJob.countDocuments(query);

    // Build response
    const response: jobSearchResponse = {
      data: searchJob,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    resp.status(200).json(response);
  } catch (error) {
    console.error("Error in search route:", error);
    resp.status(500).json({ message: "Internal Server Error" });
  }
});

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.jobTitle) {
    constructedQuery.jobTitle = new RegExp(queryParams.jobTitle, "i"); // Case-insensitive partial match
  }
  if (queryParams.jobLocation) {
    constructedQuery.jobLocation = new RegExp(queryParams.jobLocation, "i"); // Case-insensitive partial match
  }
  if (queryParams.companysIndustry) {
    constructedQuery.companysIndustry = new RegExp(
      queryParams.companysIndustry,
      "i"
    ); // Case-insensitive partial match
    if (queryParams.maxPrice) {
      constructedQuery.maxPrice = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  }
  return constructedQuery;
};
loginRouter.get(
  "/dashboard",
  verifyToken,
  async (req: Request, resp: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        resp.status(500).json({ message: "Invalid Credentails" });
        return;
      }
      const dashboard = await AddJob.find({ userId }).select(
        "Rating jobType jobStatus"
      );

      resp.status(200).json({ dashboard });
    } catch (error) {
      console.error("Error in search route:", error);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  }
);
loginRouter.get("/jobs", verifyToken, async (req: Request, resp: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      resp.status(500).json({ message: "Invalid Credentails" });
      return;
    }
    const user = await AddJob.find({ userId });

    console.log("jobs", user);

    resp.status(200).json({ user });
  } catch (error) {
    console.error("Error in search route:", error);
    resp.status(500).json({ message: "Internal Server Error" });
  }
});
loginRouter.delete(
  "/jobDelete/:jobId",
  verifyToken,
  async (req: Request, resp: Response) => {
    try {
      const userId = req.userId;
      console.log("User ID from token:", userId);

      const jobId = req.params.jobId;

      console.log("startJOb", jobId);
      console.log("Attempting to delete job with ID:", jobId);

      // First just check if the job exists at all
      const jobExists = await AddJob.findById(jobId);
      console.log("Job exists check:", jobExists);

      if (!jobExists) {
        resp.status(404).json({ message: "Job not found" });
        return;
      }

      // Then check if it belongs to this user
      if (jobExists.userId.toString() !== userId) {
        console.log("Ownership mismatch:", {
          jobUserId: jobExists.userId.toString(),
          tokenUserId: userId,
        });
        resp
          .status(403)
          .json({ message: "You don't have permission to delete this job" });
      }

      // Now delete the job
      console.log("MIdJOb", jobId);
      const userDelete = await AddJob.findByIdAndDelete(jobId);
      console.log("Job deleted:", userDelete);
      console.log("last jobId:", jobId);

      resp
        .status(200)
        .json({ message: "Job deleted successfully", job: userDelete });
    } catch (error) {
      console.error("Error in delete job route:", error);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export { loginRouter };
