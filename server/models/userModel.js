const mongoose = require("mongoose");
const scheduleSchema = require("../models/scheduleModel");
/*
  When a rider sends a request to a driver it gets scheduled for both driver and the rider (it should contain id of driver who is requested and the rider id as well) but with a pending status (already set by default). 
  
  Now say a driver receives 10 request but only 3 seats are there. Once a driver accepts a request the pending status is changed to confirmed for both driver and rider and it also decreases the available seats for the driver.
  Inside this cotroller: The driver will recieve schedule id to find the specific schedule in userModel of both driver and rider schema using their userId property reiceved from reqest body and schedule status is changed from pending to confirmed for both user and driver.
  whenever driver accepts a request a call for decrease seats will also be made.
  Therefore it needs dateTime, schedule id, user id of both

  !! Now we need to clear all the pending requests for that specific preferredDateTime as well when seats are filled -
  To do this:
  everytime a driver tries to accept a request it's checked if the driver is present in the queue for that preferredTime. 
  if not then all the schedules inside user model of the driver with that preferred time and date with pending status are cleared.
  otherwise
  decrease seat is triggered and the 2nd paragraph is also triggered.

  ! TODO: feature to add - 
  ? cancel a rider 

*/

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
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "scheduledSchema",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
