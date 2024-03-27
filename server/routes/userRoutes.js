const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
  getSchedules,
  getIncomingRequests,
  getOutgoingRequests,
  registerToken,
  clearToken
} = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

//router object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//UPDATE || PUT
router.put("/update-user", verifyToken, requireSignIn, updateUserController);

// Fetch schedules Route || GET
router.post("/schedules", verifyToken, getSchedules);

// Get incoming requests Route || GET
router.post("/incoming-req", verifyToken, getIncomingRequests);

// Get incoming requests Route || GET
router.post("/outgoing-req", verifyToken, getOutgoingRequests);

// Register token
router.post("/registertoken", verifyToken, registerToken);

router.post("/cleartoken", verifyToken, clearToken);

//export
module.exports = router;
