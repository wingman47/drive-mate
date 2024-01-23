const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
  getSchedules,
  getIncomingRequests,
  getOutgoingRequests,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//UPDATE || PUT
router.put("/update-user", requireSignIn, updateUserController);

// Fetch schedules Route || GET
router.get("/schedules", getSchedules);

// Get inoming requests Route || GET
router.get("/incoming-req", getIncomingRequests);

// Get inoming requests Route || GET
router.get("/outgoing-req", getOutgoingRequests);

//export
module.exports = router;