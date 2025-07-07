const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).send({
        error: "Access denied. No token provided.",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({
      error: "Invalid token. Authorization failed.",
      message: err.message,
    });
  }
}

function isAdmin(req, res, next) {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send({
        error: "Forbidden. Admin access required.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      error: "Server error while checking admin access.",
      message: err.message,
    });
  }
}

module.exports = { verifyToken, isAdmin };
