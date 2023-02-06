const utilsConfig = require("../utils/utils.config");

function errorHanler(err, req, res, next) {
  if (typeof err === utilsConfig.errString) {
    return res.status(400).json({ message: err.message });
  }
  if (typeof err === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (typeof err === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}

module.exports = {
  errorHanler,
};
