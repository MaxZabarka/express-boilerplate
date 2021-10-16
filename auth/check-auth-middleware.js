const jwt = require("jsonwebtoken");
const getUser = require("./get-user");

const checkAuthMiddleware = (req, res, next) => {
  try {
    let token = null;
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (e) {
      token = req.headers["sec-websocket-protocol"];
    }

    if (!token) {
      throw new HttpError(
        "Invalid token",
        401
      );
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = getUser(decodedToken.username)
    next();
  } catch (err) {
    next(
      new HttpError(
        "Invalid token",
        401
      )
    );
  }
};
module.exports = checkAuthMiddleware;
