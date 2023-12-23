const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  origin: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  destination: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  preferredDateTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  originAddress: {
    type: String,
  },
  destinationAddress: {
    type: String,
  },
});

// Create a geospatial index for the 'origin' field
driverSchema.index({ origin: "2dsphere" });

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
