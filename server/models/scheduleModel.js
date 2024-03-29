const { default: mongoose } = require("mongoose");

// referenced in the user model to track all the schedules of a user
const scheduleSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  preferredDateTime: {
    type: Date,
    required: true,
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
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema); 