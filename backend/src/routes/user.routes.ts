import { Router } from "express";
// import userAuth from "../middlewares/user.auth";
import {
  userSignup,
  userLogin,
  //   postContent,
  //   getContent,
  //   deleteContent,
  //   shareContent,
  //   getSharedContent,
} from "../controllers/user.controllers";

const userRouter = Router();

userRouter.route("/signup").post(userSignup);

userRouter.route("/login").post(userLogin);

userRouter.use(userAuth);

// userRouter.route("/content").post(postContent);

// userRouter.route("/content").get(getContent);

// userRouter.route("/content").delete(deleteContent);

// userRouter.route("/brain/share").post(shareContent);

// userRouter.route("/brain/:shareLink").get(getSharedContent);

export default userRouter;
