import jwt from "jsonwebtoken";

export function adminMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization.split(" ");
    const type = authorization[0];
    const token = authorization[1];

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }
}
