const Driver = require("../models/driverModel");
const RequestModel = require("../models/requestModel");
const scheduleModel = require("../models/scheduleModel");
const userModel = require("../models/userModel");

// JOIN DRIVER HAI BAS ISME POPULATE USE KAR LIA HAI

const joinDriver = async (req, res) => {
  try {
    const { destination, category, preferredDateTime } = req.body;
    // Find drivers matching destination, date, and time
    console.log("data recieved to find drivers: ", req.body);
    const destinationMatches = await Driver.find({
      destination,
      preferredDateTime,
    }).populate("user"); // Assuming 'user' is the reference to the user model in the Driver model

    // Find drivers matching category, date, and time
    const categoryMatches = await Driver.find({
      category,
      preferredDateTime,
    }).populate("user"); // Assuming 'user' is the reference to the user model in the Driver model

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

    // Create a new schedule for the rider
    const newSchedule = await new scheduleModel({
      origin,
      destination,
      category,
      preferredDateTime,
    }).save();

    // Find the rider and add the new schedule with pending status
    const rider = await userModel.findById(riderId);
    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    rider.schedules.push(newSchedule._id);
    await rider.save();

    // Create a new request for the driver
    const newRequest = await new RequestModel({
      rider: riderId,
      driver: driverId,
      preferredDateTime,
    }).save();

    // Find the driver (user) associated with the queued driver
    const driver = await userModel.findById(queuedDriver.user);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    console.log(driver);
    driver.request.push(newRequest._id);
    await driver.save();
    console.log(newRequest._id);

    res.status(201).json({ message: "Request successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { joinDriver, requestDriver };

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
