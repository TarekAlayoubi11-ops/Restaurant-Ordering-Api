const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Preparing",
        "Ready",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      default: "Cash"
    },

    deliveryAddress: {
      type: String,
      required: true
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);