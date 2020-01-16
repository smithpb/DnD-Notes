const router = require("express").Router();
const Notes = require("./notes-helper.js");

router.get("/", async (req, res) => {
  try {
    const notes = Notes.getAll();
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
