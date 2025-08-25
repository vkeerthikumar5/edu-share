import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    // 2. Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach the decoded user info to request
    req.user = decoded; // usually contains { id, role }

    // 4. Pass control to the next function (controller)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
