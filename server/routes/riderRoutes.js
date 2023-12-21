const express = require("express");
const joinDriver = require("../controllers/riderController");

const router = express.Router();

router.post("/joindriver", joinDriver);

module.exports = router;