const { default: mongoose } = require("mongoose");
const Driver = require("../models/driverModel");
const Request = require("../models/requestModel");
const scheduleModel = require("../models/scheduleModel");
const userModel = require("../models/userModel");

// route to create a new driver in the Driver(queue) and creates a new schedule for the driver's User model
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

// Example route to get all drivers - NOT BEING USED IN FRONTEND
const fetchDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Decrease the seats - NOT BEING USED
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

const acceptRequestFromRider = async (req, res) => {
  try {
    const { queueDriverId, requestId, riderId } = req.body;
    /**
     * Things we need to do -
     * decrease seat. if seat becomes 0 remove from the queue.
     * pending to confirmed in outgoing schema for rider user model.
     */
    const rider = await userModel.findById(riderId);
    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    // Error handling for request id

    const queueDriver = await Driver.findById(queueDriverId);
    if (!queueDriver) {
      return res.status(404).json({ error: "Queued Driver not found" });
    }

    await Driver.findOneAndUpdate(
      { _id: queueDriverId },
      { $inc: { numberOfSeats: -1 } }
    );

    const driverId = queueDriver.user;
    const driver = await userModel.findById(driverId);

    /**
     * driver -> accepts a request -> clear that request from incoming of driver
     * -----------------------------------------------------------------------------------------
     * now changes to do in rider user model -
     * 1. go through all the outgoing request from rider user model with same date and time and clear incoming request for all those driver from the same user. to do this:
     * from request schema find the queueDriverId and using that find the exact
     * driver. now clear incoming request of this driver which has the same
     * requestId
     * 2. move outgoing request with requestId from scheduled schema for rider.
     * 3. now, once done with all the drivers, clear outgoing request of rider with same date and time.
     *
     * ! TO DO:
     * If a driver recieved 5 requests with only 4 seats then after accepting all the requests
     * one rider will have an outgoing request for a driver which doesn't exists
     * in the queue (since all seats got filled and driver is now removed from the queue).
     * To handle this situation - perform cleanup of outgoing requests of a rider
     * when they fetch their outgoing requests.
     */
    console.log("DRIVER", driver);

    const requestIndex = driver.incomingRequests.indexOf(requestId);
    if (requestIndex === -1) {
      // If request not found, handle the case accordingly
      console.log("Request not found in driver's incomingRequests");
      return;
    }
    driver.incomingRequests.splice(requestIndex, 1);
    await driver.save();

    const { preferredDateTime } = Request.findById(requestId);
    const matchingRequests = rider.outgoingRequests.filter((request) => {
      return request.preferredDateTime === preferredDateTime;
    });

    // Extract queueDriverId from matchingRequests and create a new array allDrivers
    const allDrivers = matchingRequests.map((request) => request.queueDriverId);
    const redundantDrivers = allDrivers.map((eachDriver) => eachDriver.user);

    for (const driver of redundantDrivers) {
      // Find the driver by ID
      const foundDriver = await userModel.findById(driver._id);

      if (!foundDriver) {
        // If driver not found, handle the case accordingly
        console.log(`Driver with ID ${driver._id} not found`);
        continue; // Move on to the next driver
      }

      // Filter incoming requests based on riderId and preferredDateTime
      foundDriver.incomingRequests = foundDriver.incomingRequests.filter(
        (request) => {
          return (
            request.requestedByRider.toString() === riderId &&
            request.preferredDateTime === preferredDateTime
          );
        }
      );

      // Save the updated driver
      await foundDriver.save();

      console.log(`Incoming request deleted for driver with ID ${driver._id}`);
    }

    const { origin, destination, category } = Request.findById(requestId);
    // Create a new schedule for the rider
    const newSchedule = await new scheduleModel({
      origin,
      destination,
      category,
      preferredDateTime,
    }).save();

    rider.schedules.push(newSchedule._id);
    await rider.save();

    rider.outgoingRequests = rider.outgoingRequests.filter((request) => {
      return request.preferredDateTime !== preferredDateTime;
    });

    // Save the updated rider
    await rider.save();

    if (queueDriver.numberOfSeats === 0) {
      await Driver.findOneAndDelete({ _id: queueDriverId });
    }
    res.status(201).json({ message: "Accepted successfully" });
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createDriver,
  fetchDrivers,
  decreaseSeats,
  acceptRequestFromRider,
};


// {
//   "riderId": "658752a57a190e1469980c1f",
//   "queueDriverId": "65aadbeaca976ce3b5666bae",
//   "requestId": "65aadc50ca976ce3b5666bb8"
// }
