const express = require("express");
const { joinDriver, requestDriver } = require("../controllers/riderController");

const router = express.Router();

router.post("/joindriver", joinDriver);
router.post("/requestdriver", requestDriver);

module.exports = router;
