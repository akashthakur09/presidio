const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the landlord name"],
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone number"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tenant", tenantSchema);
