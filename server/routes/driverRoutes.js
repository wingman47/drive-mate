const express = require("express");
const {
  createDriver,
  fetchDrivers,
  decreaseSeats,
  acceptRequestFromRider,
} = require("../controllers/driverController");
const verifyToken = require("../middleware/auth");

// router object
const router = express.Router();

// routes
router.post("/createdriver", verifyToken, createDriver);
router.get("/fetchdrivers", verifyToken, fetchDrivers);
router.patch("/decseat/:id", verifyToken, decreaseSeats);
router.patch("/acceptrequest", verifyToken, acceptRequestFromRider);

module.exports = router;
