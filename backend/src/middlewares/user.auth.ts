import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../schema/user.schema";

async function userAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({
      message: "Please log in",
    });
    return;
  }

  try {
    const decodedInfo = jwt.verify(
      token,
      `${process.env.JWT_USER_SECRET}`
    ) as JwtPayload;

    if (!decodedInfo) {
      res
        .status(400)
        .json({ message: "Unauthorized - invalid or expired session" });
      return;
    }

    const user = await User.findById(decodedInfo.id).select("-password");

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Invalid server error",
    });
  }
}

export default userAuth;
