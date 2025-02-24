import { Router } from "express";
import userAuth from "../middlewares/user.auth";
import {
  userSignup,
  userLogin,
  postContent,
  getContent,
  deleteContent,
  shareContent,
  getSharedContent,
} from "../controllers/user.controllers";

const userRouter = Router();

userRouter.route("/api/v1/signup").post(userSignup);

userRouter.route("/api/v1/login").post(userLogin);

userRouter.use(userAuth);

userRouter.route("/api/v1/content").post(postContent);

userRouter.route("/api/v1/content").get(getContent);

userRouter.route("/api/v1/content").delete(deleteContent);

userRouter.route("/api/v1/brain/share").post(shareContent);

userRouter.route("/api/v1/brain/:shareLink").get(getSharedContent);

export default userRouter;
