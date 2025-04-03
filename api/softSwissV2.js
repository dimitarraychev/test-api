const express = require("express");
const router = express.Router();

router.post("/:category/:action", (req, res) => {
  const { category, action } = req.params;

  console.log(`Category: ${category}, Action: ${action}`);

  switch (`${category}/${action}`) {
    case "Round/Rollback":
      return res.json({ message: "Rollback successful" });

    case "Player/Balance":
      return res.json({ message: "Balance retrieved", balance: 1000 });

    case "Promo/Bet":
      return res.json({ message: "Promo Bet placed" });

    case "Promo/Win":
      return res.json({ message: "Promo Win processed" });

    default:
      return res.status(404).json({ error: "Unknown request" });
  }
});

module.exports = router;
