const Driver = require("../models/driverModel");

// Example route to create a new driver
const createDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example route to get all drivers
const fetchDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDriver,
  fetchDrivers,
};
