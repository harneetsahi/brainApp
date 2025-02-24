import { Router } from "express";
import {
  signup,
  login,
  postContent,
  getContent,
  deleteContent,
  shareContent,
  getSharedContent,
} from "../controllers/user.controllers";

const router = Router();

router.route("/api/v1/signup").post(signup);

router.route("/api/v1/login").post(login);

router.route("/api/v1/content").post(postContent);

router.route("/api/v1/content").get(getContent);

router.route("/api/v1/content").delete(deleteContent);

router.route("/api/v1/brain/share").post(shareContent);

router.route("/api/v1/brain/:shareLink").get(getSharedContent);

export default router;
