const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  origin: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
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
});

// Create a geospatial index for the 'origin' field
driverSchema.index({ origin: "2dsphere" });

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;

/*

*/