import jwt from "jsonwebtoken";

function adminAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const splitAuth = authorization.split(" ");
  const token = splitAuth[1];

  if (!token) {
    return res.json({
      message: "unauthorized access",
    });
  }

  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.userId = decodedInfo._id;
    next();
  } catch (error) {
    res.json({
      message: "Expired session. Please login",
    });
  }
}

export default adminAuth;
