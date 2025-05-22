import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      req.user = null; // Guest access
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Contains user._id and any other info you signed
    next();
  } catch (err) {
    req.user = null; // Token invalid or expired = treat as guest
    next();
  }
};

export default verifyUser;



