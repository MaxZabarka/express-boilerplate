const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("./util/http-error")
const loginController = require("./auth/login-controller");
const checkAuthMiddleware = require("./auth/check-auth-middleware");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", loginController);

app.use(checkAuthMiddleware);

app.get("/protected", (req, res) => {
  res.send(req.user.username);
});

app.use(() => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  console.log(error);
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ errorMessage: error.message || "Unknown error occurred" });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
