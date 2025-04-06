const express = require("express");
const router = express.Router();
const factureController = require("../controllers/FactureController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

router.post("/", authenticate, isAdmin, factureController.createFacture);
router.get("/:commandeId", authenticate, factureController.getFacture);
router.post("/send", factureController.sendInvoiceEmail); // optionnel

module.exports = router;
