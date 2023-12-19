const express = require("express");
const {
  createDriver,
  fetchDrivers,
} = require("../controllers/driverController");

// router object
const router = express.Router();

// routes

router.post("/createdriver", createDriver);
router.post("/fetchdrivers", fetchDrivers);

module.exports = router;
