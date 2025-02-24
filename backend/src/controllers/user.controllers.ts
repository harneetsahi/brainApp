import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../db/user.schema";

async function userSignup(req, res) {
  /// zod validation

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
    return res.json({
      message: "Incorrect format",
      error: parsedData.error,
    });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({ firstName, lastName, email, hashedPassword });

    res.json({ message: "You are successfully signed up" });
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }

  res.status(200).json({ message: "Signed up" });
}

//

async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        const token = jwt.sign(
          { id: user._id },
          `${process.env.JWT_USER_SECRET}`
        );

        return res.status(200).json({
          message: "Logged in",
          token: token,
        });
      } else {
        return res.status(401).json({ message: "Incorrect credentials" });
      }
    } else return res.json({ message: "User does not exist" });
  } catch (error) {
    res.json({ message: "Internal server error" });
  }
}

function postContent(req, res) {
  res.status(200).json({
    message: "Posted content",
  });
}

function getContent(req, res) {
  res.status(200).json({
    message: "Fetched content",
  });
}

function deleteContent(req, res) {
  res.status(200).json({
    message: "deleted content",
  });
}
function shareContent(req, res) {
  res.status(200).json({
    message: "share link",
  });
}
function getSharedContent(req, res) {
  res.status(200).json({
    message: "fetched shared link",
  });
}

export {
  userSignup,
  userLogin,
  postContent,
  getContent,
  deleteContent,
  shareContent,
  getSharedContent,
};
