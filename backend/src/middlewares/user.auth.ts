import jwt from "jsonwebtoken";

function userAuth(req: any, res: any, next: any) {
  const authorization = req.headers.authorization;
  const splitAuth = authorization.split(" ");
  const token = splitAuth[1];

  if (!token) {
    return res.json({
      message: "unauthorized access",
    });
  }

  try {
    const decodedInfo: any = jwt.verify(
      token,
      `${process.env.JWT_USER_SECRET}`
    );

    console.log(decodedInfo);
    req.userId = decodedInfo.id;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired session",
    });
  }
}

export default userAuth;
