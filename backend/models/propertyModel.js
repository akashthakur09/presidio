const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    landlord_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Landlord",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    hospitals: {
      type: Number,
      required: true,
    },
    colleges: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
