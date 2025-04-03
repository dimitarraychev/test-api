const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req);

  const { category, action } = req.params;

  console.log(`Category: ${category}, Action: ${action}`);

  switch (`${category}/${action}`) {
    case "provider_a8r.Promo/Win":
      return res.json({ message: "Promo Win processed" });

    case "provider_a8r.Promo/Bet":
      return res.json({ message: "Promo Bet placed" });

    case "provider_a8r.Player/Balance":
      return res.json({ message: "Balance retrieved", balance: 1000 });

    case "provider_a8r.Round/Rollback":
      return res.json({ message: "Rollback successful" });

    default:
      return res.status(404).json({ error: "Unknown request" });
  }
});

module.exports = router;
