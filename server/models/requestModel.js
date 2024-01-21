const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// referenced in the user model to track all the requests of a user
const requestSchema = new Schema({
  requestedByRider: {
    type: Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  queueDriverId: {
    type: Schema.Types.ObjectId,
    ref: "driverModel",
    required: true,
  },
  preferredDateTime: {
    type: String,
  },
  category: {
    type: String,
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
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
