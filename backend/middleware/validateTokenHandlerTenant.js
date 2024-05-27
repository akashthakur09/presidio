const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateTokenHandlerTenant = asyncHandler(async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ message: "User not authorized" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token,"ACCESS_TOKEN_SECRET");

      console.log("Decoded Token: ", decoded);  // Log decoded token

      req.tenant = decoded.tenant;
      // req.user = decoded.user;  
      next();
  } catch (error) {
      console.error("Authorization error:", error);
      return res.status(401).json({ message: "User not authorized" });
  }
});

module.exports = validateTokenHandlerTenant;
