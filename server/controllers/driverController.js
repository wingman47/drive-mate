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


// Khatarnaak controller hai bhai (handles the thing which will be done when driver accepts the request).

const acceptRequestFromRider = async (req, res) => {

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
 
  try {
    const { queueDriverId, requestId, riderId } = req.body;

    // Input validation
    if (!queueDriverId || !requestId || !riderId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Fetch rider and populate outgoingRequests
    const rider = await userModel.findById(riderId).populate({
      path: 'outgoingRequests',
      model: 'Request',
    });

    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    // Fetch request information
    const requestInfo = await Request.findById(requestId);
    if (!requestInfo) {
      return res.status(404).json({ error: "Request not found" });
    }

    const { preferredDateTime, origin, destination, category } = requestInfo;

    // Fetch queueDriver
    const queueDriver = await Driver.findById(queueDriverId);
    if (!queueDriver) {
      return res.status(404).json({ error: "Queued Driver not found" });
    }

    // Decrease seat count for the driver
    await Driver.findByIdAndUpdate(queueDriverId, { $inc: { numberOfSeats: -1 } });

    // Remove incoming request from driver
    const driverId = queueDriver.user;
    const driver = await userModel.findById(driverId);

    const requestIndex = driver.incomingRequests.indexOf(requestId);
    if (requestIndex !== -1) {
      driver.incomingRequests.splice(requestIndex, 1);
      await driver.save();
    } else {
      console.log("Request not found in driver's incomingRequests");
    }

    // Process redundant drivers
    const matchingRequests = rider.outgoingRequests.filter((request) => {
      return request.preferredDateTime === preferredDateTime;
    });

    const driversWithRequests = matchingRequests.map((request) => request.queueDriverId);

    const usersWithIncomingReq = await Promise.all(
      driversWithRequests.map(async (driverId) => {
        const { user } = await Driver.findById(driverId);
        return user;
      })
    );


    // Remove incoming requests from users
    await Promise.all(usersWithIncomingReq.map(async (userId) => {
      try {
        const driver = await userModel.findById(userId);
      
        // Find the matching request in the user's incomingRequests
        const matchingRequest = driver.incomingRequests.find((request) =>
          matchingRequests.some((matchingRequest) =>
            matchingRequest.equals(request)  // Check if the request ID is in matchingRequests
          )
        );
      
        if (matchingRequest) {
          const requestIndex = driver.incomingRequests.indexOf(matchingRequest);
      
          // Remove the found request from incomingRequests
          if (requestIndex !== -1) {
            driver.incomingRequests.splice(requestIndex, 1);
            await driver.save();
          } else {
            console.log("Request not found in driver's incomingRequests");
          }
        } else {
          console.log("Matching request not found in driver's incomingRequests");
        }
      } catch (error) {
        console.error(`Error processing user with ID ${userId}:`, error);
      }
    }));
        

    // Create a new schedule for the rider
    const newSchedule = await new scheduleModel({
      origin,
      destination,
      category,
      preferredDateTime,
    }).save();

    rider.schedules.push(newSchedule._id);

    // Remove outgoing request from rider

    // !ToDO --- YE SHI KAAM NHI KAR RHA HAI BAS.
    rider.outgoingRequests = rider.outgoingRequests.filter(
      (request) => request.preferredDateTime !== preferredDateTime
    );

    // rider.outgoingRequests = rider.outgoingRequests.filter(
    //   (request) => !matchingRequests.includes(request._id.toString())
    // );

    // Save the updated rider
    await rider.save();

    // Delete the processed request
    await Request.findByIdAndDelete(requestId);

    // Delete driver if no seats are left
    if (queueDriver.numberOfSeats === 0) {
      await Driver.findByIdAndDelete(queueDriverId);
    }

    res.status(201).json({ message: "Accepted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createDriver,
  fetchDrivers,
  decreaseSeats,
  acceptRequestFromRider,
};


// For accepting requests.
// {
//   "riderId": "658752a57a190e1469980c1f",
//   "queueDriverId": "65aadbeaca976ce3b5666bae",
//   "requestId": "65aadc50ca976ce3b5666bb8"
// }

// For sending requests
// {
//   "riderId": "65ab94d11cc1be77fa480ea6",
//   "driverId": "65ad7283e72ffb96780f5783",
//   "preferredDateTime": "2024-01-22T06:30:00.000+00:00"
// }