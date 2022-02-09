const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    title: { type: String, require: true, min: 3 },
    desc: { type: String, require: true, min: 6 },
    rating: { type: Number, require: true, min: 0, max: 5 },
    lat: { type: Number, require: true },
    long: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", PlaceSchema);
