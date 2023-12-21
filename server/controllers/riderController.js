const Driver = require("../models/driverModel");

const joinDriver = async (req, res) => {
  try {
    const { destination, category, preferredDateTime } = req.body;
    // Find drivers matching destination, date, and time
    const destinationMatches = await Driver.find({
      destination,
      preferredDateTime,
    });

    // Find drivers matching category, date, and time
    const categoryMatches = await Driver.find({
      category,
      preferredDateTime,
    });

    // Prepare response with labels
    const response = {
      matchesDestination: destinationMatches,
      matchesCategory: categoryMatches,
    };
    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = joinDriver;

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
