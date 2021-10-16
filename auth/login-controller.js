const jwt = require("jsonwebtoken");
const getUser = require("./get-user");

const loginController = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = getUser(username);
  if (!user || user.password !== password) {
    throw new HttpError(
      "Invalid credentials",
      401
    );
  }

  let token;
  token = jwt.sign(
    { username: user.username, email: user.email, password },
    process.env.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );

  res.status(201).json({ token });
};
module.exports = loginController;
