const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const { checkCred } = require("../util/middleware.js");
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", checkCred, async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const newUser = await Users.create(user);
    const token = generateToken(newUser);
    res.status(201).json({ token, newUser });
  } catch (e) {
    res.status(500).json({ error: "Something went wrong with the server." });
  }
});

router.post("/login", checkCred, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findUsername(username);
    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;
      const token = generateToken(user);
      res.status(200).json({ token, user });
    }
  } catch (e) {
    res.status(500).json({ message: "Credentials provided are invalid." });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
