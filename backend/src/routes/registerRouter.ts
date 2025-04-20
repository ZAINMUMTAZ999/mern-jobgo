import express, { Request, Response } from "express";
import { User } from "../models/register.models";
import jwt from "jsonwebtoken";
export const registerRouter = express.Router();
// export const adminRegisterRouter = express.Router();
registerRouter.post("/register", async (req, resp) => {
  const { email,role } = req.body;

  console.log("role",role)
  try {
    let user = await User.findOne({ email });
    if(user){
        resp.status(400).json({message:"User with this email already exists"})
    };
    user=new User(req.body);
    console.log("body",req.body)
    await user.save();
 const token=   jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string , {
        expiresIn:"1d"
    });
    console.log("register_Token",token);
    resp.cookie("auth_token",token,{
        httpOnly:true,
        secure:  process.env.NODE_ENV === "production",
        maxAge: 86400000,
        
    });
    resp.status(200).json({user})
    console.log("user",user)

  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Something Went Wrong" });
  }
});
// adminRegisterRouter.post("/adminRegister", async (req, resp) => {
//   const { email } = req.body;
//   try {
//     // const email = "admin@gmail.com"
//     let user = await User.findOne({ email });
//     if(user){
//         resp.status(400).json({message:"User with this email already exists"})
//     };
//   console.log("user",user)
//   user=new User(req.body);
//   await user.save();
//   console.log("user",user)
// //  const token=   jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string , {
// //         expiresIn:"1d"
// //     });
// //     console.log("register_Token",token);
// //     resp.cookie("auth_token",token,{
// //         httpOnly:true,
// //         secure:  process.env.NODE_ENV === "production",
// //         maxAge: 86400000,
        
// //     });
//     resp.status(200).json({user})

//   } catch (error) {
//     console.log(error);
//     resp.status(500).json({ message: "Something Went Wrong" });
//   }
// });