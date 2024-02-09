const Driver = require("../models/driverModel");
const RequestModel = require("../models/requestModel");
const scheduleModel = require("../models/scheduleModel");
const userModel = require("../models/userModel");

// find driver at same destination && in time range.

const findDriversInTimeRange = async (req, res) => {
  const { destination, category, preferredDateTime } = req.body;
  const currentDate = new Date(preferredDateTime + "Z");
  const futureDate = new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutes ahead
  const pastDate = new Date(currentDate.getTime() - 10 * 60 * 1000); // 10 minutes behind
  try {
    const drivers = await Driver.find({
      $and: [
        {
          preferredDateTime: {
            $gte: pastDate,
            $lte: futureDate,
          }
        },
        {
          "destination.coordinates": {
            $geoWithin: {
              $centerSphere: [destination.coordinates, 10 / 6371] // 10 km radius
            }
          }
        }
      ]
    });
    console.log(drivers);
    res.status(200).json({ success: true, data: drivers });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server Error" });
    console.error("Error finding drivers within range and destination:", error.message);
  }
}

// Find in radius.
const findInRadius = async (req, res) => {
  const { destination, category, preferredDateTime } = req.body;
  const currentDate = new Date(preferredDateTime + "Z");
  const futureDate = new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutes ahead
  const pastDate = new Date(currentDate.getTime() - 10 * 60 * 1000); // 10 minutes behind
  try {
    const drivers = await Driver.find({
      $and: [
        {
          preferredDateTime: {
            $gte: pastDate,
            $lte: futureDate,
          }
        },
        {
          "destination.coordinates": {
            $geoWithin: {
              $centerSphere: [destination.coordinates, 10 / 6371] // 10 km radius
            }
          }
        }
      ]
    });
    console.log(drivers);
    res.status(200).json({ success: true, data: drivers });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server Error" });
    console.error("Error finding drivers within range and destination:", error.message);
  }
}


// find driver 

const findDrivers = async (req, res) => {
  try {
    const { destination, category, preferredDateTime } = req.body;
    // Find drivers matching destination, date, and time
    console.log("data recieved to find drivers: ", req.body);
    const destinationMatches = await Driver.find({
      destination,
      preferredDateTime,
    }).populate("user");

    // Find drivers matching category, date, and time
    const categoryMatches = await Driver.find({
      category,
      preferredDateTime,
    }).populate("user");

    // Prepare response with labels and spread user information
    if (destinationMatches.length > 0 || categoryMatches.length > 0) {
      const response = {
        status: "success",
        message: "Matches found!",
        data: {
          matchesDestination: destinationMatches.map((driver) => ({
            ...driver.toObject(),
            user: driver.user.toObject(),
          })),
          matchesCategory: categoryMatches.map((driver) => ({
            ...driver.toObject(),
            user: driver.user.toObject(),
          })),
        },
      };
      console.log(response);
      return res.status(200).send(response);
    } else {
      const response = {
        status: "no_matches",
        message: "No matching drivers found.",
        data: {
          matchesDestination: [],
          matchesCategory: [],
        },
      };
      console.log(response);
      return res.status(200).send(response);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

const requestDriver = async (req, res) => {
  try {
    // rider id, driver id, preferredDateTime
    const { riderId, driverId, preferredDateTime } = req.body;

    // Find the driver
    const queuedDriver = await Driver.findOne({ _id: driverId });
    if (!queuedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const { origin, destination, category } = queuedDriver;

    // Find the rider and add the new schedule with pending status
    const rider = await userModel.findById(riderId);
    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    // Find the driver (user) associated with the queued driver
    const driver = await userModel.findById(queuedDriver.user);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    console.log(driver);

    const outgoingRequest = await new RequestModel({
      requestedByRider: riderId,
      queueDriverId: queuedDriver._id,
      origin,
      destination,
      category,
      preferredDateTime,
    }).save();

    // push request as outgoing for the rider
    rider.outgoingRequests.push(outgoingRequest._id);
    await rider.save();

    // push request as incoming for the driver
    driver.incomingRequests.push(outgoingRequest._id);
    await driver.save();

    res.status(201).json({ message: "Request successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { findDrivers, requestDriver };

/*
destructure: date, time, destination, category

ya to category match hoga ya destination... dono alg alg find kro
aur dono ko object me bhej do
frontend me label dal do ki category ya destinatation match hua h

data aega usko recieve kro aur uss data k basis pr driver model me find request kro aur wo sare drivers ko array me dal k wapas bhej do.send krne wale data me driver ka origin v hoga



// ! TODO: driver ka accept krne wala part
*/

// {
//   "user": "65847792489291a157f06cf9",
//   "destination": {
//     "type": "Point",
//     "coordinates": [-118.25, 34.052]
//   },
//   "category": "movie",
//   "preferredDateTime": "2023-01-01T12:00:00Z"
// }