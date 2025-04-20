import mongoose from "mongoose";

enum Role {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator'
}
export type AddJobTypes = {
  dashboard: never[];

  _id:string;
  userId:string;
  companyName: string;
  imageFile:  string; 
  ownerName: string;
  companyOwnerNumber: number;
  ownerEmail: string;
  companysIndustry: string;
  companyDescription: string;
  jobTitle: string;
  file:File;
  
  numberofPeopleHiring: number;
  jobLocation: string;
  
  salary: number;
  postalCode : number;
  jobStatus: "Interview" | "Pending" | "Declined";
  // jobStatus:string;
  starRating:string[];
  imageUrl:string[];
  jobType:Role;
  role:string;
  fvrtJob:string;
  textEditor:string;
  // companyFind:["NewsPaper","mobile","social networks","addverstjjisment","college"]
  companyFind:string;
  // textEditor2:string;
  date: Date;
};
export const addJobSchema = new mongoose.Schema<AddJobTypes>({
  companyName: {
    type: String,
    // required: true,
  },
  userId: {
    type: String,
    // required: true,
  },
  imageFile:{
type:String
  },
  ownerName: {
    type: String,
    // required: true,
  },
//   imageUrl:[{
// type:String
//   }],
  companyFind: {
    type: String,
    // required: true,
  },
 
  jobType: {
    type: String,
    // required: true,
  },
  role:{
    type:String,
    // required:true,
    enum: Object.values(Role),
    default: Role.User,
    },
  companyOwnerNumber: {
    type: Number,
    // required: true,
  },
  ownerEmail: {
    type: String,
    // required: true,
  },
  companysIndustry: {
    type: String,
    // required: true,
  },
  companyDescription: {
    type: String,
    // required: true,
  },
  jobStatus: { 
    type: String, 
    required: true, 
    enum: ["Interview", "Pending", "Declined"],
    default: "Pending" // Default value for new jobs
  },
  jobTitle: {
    type: String,
    // required: true,
  },
  numberofPeopleHiring: {
    type: Number,
    // required: true,
  },
  jobLocation: {
    type: String,
    // required: true,
  },
starRating: [{
    type: String,
    // required: true,
  }],
  salary: {
    type: Number,
    // required: true,
  },
  postalCode:{
type:Number,
// required:true
  },
  fvrtJob:{
type:String,
// required:true
  },
  textEditor:{
type:String,
// required:true
  },
//   textEditor2:{
// type:String,
// required:true
//   },
  date: {
    type: Date,
    default: Date.now
    // required: true
  },
});

export const AddJob = mongoose.model<AddJobTypes>("AddJob", addJobSchema);
