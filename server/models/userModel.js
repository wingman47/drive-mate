const mongoose = require("mongoose");

const scheduledSchema = new mongoose.Schema({
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
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      min: 6,
      max: 64,
    },
    schedules: [scheduledSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
