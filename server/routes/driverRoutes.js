const express = require("express");
const {
  createDriver,
  fetchDrivers,
  decreaseSeats,
} = require("../controllers/driverController");

// router object
const router = express.Router();

// routes

router.post("/createdriver", createDriver);
router.get("/fetchdrivers", fetchDrivers);
router.patch("/decseat/:id", decreaseSeats);

module.exports = router;