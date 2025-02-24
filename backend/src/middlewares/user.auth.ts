import jwt from "jsonwebtoken";

function userAuth(req: string, res, next) {
  const authorization = req.headers.authorization;
  const splitAuth = authorization.spli(" ");
  const token = splitAuth[1];

  if (!token) {
    return res.json({
      message: "unauthorized access",
    });
  }

  try {
    const decodedInfo = jwt.verify(token, `${process.env.JWT_USER_SECRET}`);

    req.userId = decodedInfo._id;
    next();
  } catch (error) {
    res.json({
      message: "Invalid or expired session",
    });
  }
}

export default userAuth;
