const express = require("express");
const {
  createDriver,
  fetchDrivers,
  decreaseSeats,
  acceptRequestFromRider,
} = require("../controllers/driverController");

// router object
const router = express.Router();

// routes
router.post("/createdriver", createDriver);
router.get("/fetchdrivers", fetchDrivers);
router.patch("/decseat/:id", decreaseSeats);
router.patch("/acceptrequest", acceptRequestFromRider);

module.exports = router;
