// import { Request,Response,NextFunction } from "express"

// const authRoles = (...allowedRoles:string[])=>{
//     return(req:Request,resp:Response,next:NextFunction)=>{
//         if(!allowedRoles.includes(req.userId)){
//             return resp.status(402).json({message:"access denied"})

//         };
//         next()
//     } 

// };
// export {
//     authRoles
// };





import { Request, Response, NextFunction } from 'express';

interface User {
    role: string;
    // Other user properties as needed
  }
  
  declare global {
    namespace Express {
      interface Request {
        user: User;
      }
    }
  }
  export const authRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("authMiddlewareRole",req.user.role);
      return new Promise((resolve, reject) => {
        if (!allowedRoles.includes(req.user.role)) {
        
          res.status(403).json({ message: 'Access denied' });
          reject();
        } else {
          next();
          resolve();
        }
      });
    };
  };









    
  

// export default authorizeRoles;