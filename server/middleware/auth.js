const jsonwebtoken = require("jsonwebtoken");

const auth = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Token not valid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const valid = await jsonwebtoken.verify(token, process.env.SECRETE_KEY);
    req.user = { userID: valid.userID };
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Token not valid" });
  }
};

module.exports = auth;
