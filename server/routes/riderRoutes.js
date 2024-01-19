const express = require("express");
const { findDrivers, requestDriver } = require("../controllers/riderController");

const router = express.Router();

router.post("/finddrivers", findDrivers);
router.post("/requestdriver", requestDriver);

module.exports = router;
