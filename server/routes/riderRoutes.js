const express = require("express");
const {
  findDrivers,
  requestDriver,
} = require("../controllers/riderController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/finddrivers", verifyToken, findDrivers);
router.post("/requestdriver", verifyToken, requestDriver);

module.exports = router;
