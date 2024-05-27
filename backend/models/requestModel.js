const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tenant",
    },
    landlord_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Landlord",
    },
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Request", RequestSchema);
