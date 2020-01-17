const router = require("express").Router();
const Kingdoms = require("./kingdom-helper.js");

router.get("/", async (req, res) => {
  try {
    const kingdoms = await Kingdoms.getAll();
    res.status(200).json(kingdoms);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
