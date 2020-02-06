module.exports = {
  checkCred
};

function checkCred(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res
      .status(422)
      .json({ message: "Please provide both username and password" });
  }
}
