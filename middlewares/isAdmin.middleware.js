const jwt = require('jsonwebtoken');
async function isAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, "secret");
  if (!decoded) return res.status(401).json({ message: "Token is not valid" });

  if (decoded.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = isAdmin;
