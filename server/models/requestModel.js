const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  rider: { type: Schema.Types.ObjectId, ref: "riderModel", required: true },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "driverModel",
    required: true,
  },
  preferredDateTme: {
    Type: String,
  },
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
