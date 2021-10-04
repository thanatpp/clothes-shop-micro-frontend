const jwt = require("jsonwebtoken");
const KEY = `${process.env.SECRET_KEY}`;

const authorization = (req, res, next) => {
  const TOKEN = req.headers["authorization"];

  if (TOKEN === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  } else {
    jwt.verify(TOKEN, KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      } else {
        next();
      }
    });
  }
};

module.exports = authorization;
