import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import {
  signup,
  login,
  signout,
  checkAuth,
  postContent,
  getContent,
  deleteContent,
  shareBrain,
  stopSharingBrain,
  getSharedBrain,
} from "../controllers/user.controllers";

const userRouter = Router();

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/signout").post(signout);

// open endpoint so anyone can access if shareable
userRouter.route("/brain/share/:shareLink").get(getSharedBrain);

userRouter.use(userAuth);

userRouter.route("/checkAuth").get(checkAuth);

userRouter.route("/content").get(getContent);

userRouter.route("/content").post(postContent);

userRouter.route("/content/:contentId").delete(deleteContent);

userRouter.route("/brain/share").post(shareBrain);

userRouter.route("/brain/share").delete(stopSharingBrain);

export default userRouter;
