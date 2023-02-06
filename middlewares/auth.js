const jwt = require("jsonwebtoken");
const utilsConfig = require("../utils/utils.config");
function authenticateToken(req, res, next) {
  const authHeader = req.headers[utilsConfig.authorization];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, utilsConfig.secreteKeyTitle, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, utilsConfig.secreteKeyTitle, {
    expiresIn: utilsConfig.expiresIn,
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
