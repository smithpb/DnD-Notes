const router = require("express").Router();
const Locations = require("./location-helper.js");

router.get("/", async (req, res) => {
  try {
    const places = await Locations.getAll();
    res.status(200).json(places);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong with the server" });
  }
});

module.exports = router;
