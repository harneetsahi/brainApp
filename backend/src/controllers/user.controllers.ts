import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import random from "../utils/index.js";
import { User } from "../schema/user.schema.js";
import { Content } from "../schema/content.schema.js";
import { Link } from "../schema/link.schema.js";

async function signup(req: Request, res: Response) {
  const requiredBody = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
        {
          message:
            "Password must be at least 8 characters long with max 16 characters and have at least 1 uppercase, 1 lowercase, 1 special character, and one number",
        }
      ),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Incorrect format",
      error: parsedData.error,
    });
    return;
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_USER_SECRET}`, {
      expiresIn: "7d",
    });

    const options = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    };

    res.status(201).cookie("jwt", token, options).json({
      message: "You are successfully signed up",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        const token = jwt.sign(
          { id: user._id },
          `${process.env.JWT_USER_SECRET}`,
          { expiresIn: "7d" }
        );

        const options = {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
        };

        res.status(201).cookie("jwt", token, options).json({
          message: "Logged in",
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          _id: user._id,
        });
      } else {
        res.status(403).json({ message: "Incorrect credentials" });
        return;
      }
    } else {
      res.status(403).json({ message: "User does not exist" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function signout(req: Request, res: Response) {
  try {
    res
      .clearCookie("jwt", {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
      })
      .status(201)
      .json({
        message: "logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function checkAuth(req: Request, res: Response) {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updatePassword(req: Request, res: Response) {
  const userId = req.user?._id;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    res.status(401).json({
      message: "New passwords must match",
    });
    return;
  }

  if (oldPassword === newPassword) {
    res.status(400).json({
      message: "New password cannot be the same as old password",
    });
    return;
  }

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const matchPassword = await bcrypt.compare(oldPassword, user?.password);

    if (!matchPassword) {
      res.status(406).json({ message: "Incorrect credentials" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);

    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password successfully updated" });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching yours posts",
    });
  }
}

async function getContent(req: Request, res: Response) {
  const userId = req.user?._id;

  try {
    const contents = await Content.find({ userId }).populate(
      "userId",
      "firstName"
    );

    res.status(201).json({
      message: "All your posts",
      content: contents,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Error fetching yours posts",
    });
  }
}

async function postContent(req: Request, res: Response) {
  const { title, link, description } = req.body;

  if (!description && !title) {
    res.status(400).json({
      message: "Title or notes field must be filled out",
    });
    return;
  }

  try {
    const content = await Content.create({
      title,
      link,
      description,
      userId: req.user?._id,
    });

    res.status(201).json({
      message: "Content posted",
      content: content,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteContent(req: Request, res: Response) {
  const userId = req.user?._id;
  const { contentId } = req.params;

  try {
    const content = await Content.deleteOne({
      _id: contentId,
      userId,
    });

    if (content.deletedCount === 0) {
      res.status(401).json({
        message: "Could not delete content",
      });
      return;
    }

    res.status(201).json({
      message: "Content deleted",
      deletedContentId: contentId,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function shareNotes(req: Request, res: Response) {
  const userId = req.user?._id;

  try {
    const linkAlreadyExists = await Link.findOne({ userId });

    if (linkAlreadyExists) {
      res.status(202).json({
        message: "Link already exists",
        link: linkAlreadyExists.hash,
      });
      return;
    }

    const hash = random(10);

    await Link.create({ hash, userId });

    res.status(201).json({
      message: "Shareable link created",
      link: hash,
    });
  } catch (error) {
    res.json({
      message: "Unable to share content",
    });
  }
}

async function stopSharingNotes(req: Request, res: Response) {
  const userId = req.user?._id;

  try {
    await Link.deleteOne({ userId });

    res.status(201).json({
      message: "Removed shared link",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSharedNotes(req: Request, res: Response) {
  const { shareLink } = req.params;

  try {
    const link = await Link.findOne({ hash: shareLink });

    if (!link) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    const content = await Content.find({ userId: link.userId });

    const user = await User.findOne({ _id: link.userId });

    if (!content) {
      res.status(404).json({ message: "No content available" });
      return;
    }

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      content: content,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch content due to server error",
    });
  }
}

export {
  signup,
  login,
  signout,
  checkAuth,
  updatePassword,
  postContent,
  getContent,
  deleteContent,
  shareNotes,
  stopSharingNotes,
  getSharedNotes,
};
