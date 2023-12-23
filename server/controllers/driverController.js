const Driver = require("../models/driverModel");
const scheduleModel = require("../models/scheduleModel");
const userModel = require("../models/userModel");

// Example route to create a new driver
const createDriver = async (req, res) => {
  try {
    const userIDD = req.body.user;
    console.log(userIDD);
    const newDriver = new Driver(req.body);
    const {
      user: userId,
      origin,
      destination,
      category,
      preferredDateTime,
    } = req.body;

    // Save the new driver
    const savedDriver = await newDriver.save();
    // Find the user by ID
    const user = await userModel.findById(userId);
    // Validate user existence
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Adding new Schedule
    const newSchedule = await new scheduleModel({
      origin,
      destination,
      category,
      preferredDateTime,
      status: "confirmed",
    }).save();
    user.schedules.push(newSchedule._id);
    await user.save();
    console.log("added ", savedDriver);
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

// Decrease the seats.
const decreaseSeats = async (req, res) => {
  const { id: driverId } = req.params;

  try {
    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    if (driver.numberOfSeats > 1) {
      // Decrease the number of seats by 1
      driver.numberOfSeats -= 1;

      await driver.save();

      return res.status(200).json(driver);
    } else {
      await Driver.findByIdAndDelete(driverId);
      //  Deleated from the queue.
      return res.status(400).json({ msg: "Seats are filled" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createDriver,
  fetchDrivers,
  decreaseSeats,
};
