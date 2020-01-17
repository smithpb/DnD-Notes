const router = require("express").Router();
const NPCs = require("./npc-helper.js");

router.get("/", async (req, res) => {
  try {
    const npcs = await NPCs.getAll();
    res.status(200).json(npcs);
  } catch (e) {
    res.status(5000).json({ error: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const npc = await NPCs.findByName(name);
    res.status(200).json(npc);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/new", async (req, res) => {
  const npc = req.body;
  if (npc.name) {
    try {
      const newNPC = await NPCs.create(npc);
      res.status(201).json(newNPC);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(422).json({ message: "Please provide a valid name" });
  }
});

module.exports = router;
