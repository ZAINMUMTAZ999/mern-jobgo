import  { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
export const verifyToken =  (
  req: Request,
  resp: Response,
  next: NextFunction
) => {

  const token = req.cookies["auth_token"];
  if (!token) resp.status(400).json({ message: "token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Unauthorized" });
  }
};

