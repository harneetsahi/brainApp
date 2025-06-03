import { Request } from "express";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
