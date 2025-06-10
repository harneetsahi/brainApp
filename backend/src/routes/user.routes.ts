import { Router } from "express";
import userAuth from "../middlewares/user.auth.js";
import {
  signup,
  login,
  signout,
  checkAuth,
  postContent,
  getContent,
  deleteContent,
  shareNotes,
  stopSharingNotes,
  getSharedNotes,
  updatePassword,
} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/signout").post(signout);

userRouter.route("/notes/share/:shareLink").get(getSharedNotes);

userRouter.use(userAuth);

userRouter.route("/checkAuth").get(checkAuth);

userRouter.route("/settings/updatePassword").post(updatePassword);

userRouter.route("/content").get(getContent);

userRouter.route("/content").post(postContent);

userRouter.route("/content/:contentId").delete(deleteContent);

userRouter.route("/notes/share").post(shareNotes);

userRouter.route("/notes/share").delete(stopSharingNotes);

export default userRouter;
