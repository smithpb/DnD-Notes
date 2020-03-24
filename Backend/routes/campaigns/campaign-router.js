const router = require("express").Router();
const { verify } = require("../util/middleware.js");

const Campaigns = require("./campaign-helper.js");

router.get("/", verify, async (req, res) => {
  const user_id = req.decodedToken.subject;
  try {
    const campaigns = await Campaigns.getAll(user_id);
    res.status(201).json(campaigns);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

router.post("/", verify, async (req, res) => {
  const campaign = req.body;
  campaign.author_id = req.decodedToken.subject;

  try {
    const newCampaign = await Campaigns.create(campaign);
    res.status(201).json(newCampaign);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong with the server." });
  }
});

module.exports = router;
