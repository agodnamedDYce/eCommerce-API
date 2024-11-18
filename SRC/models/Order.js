import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      }
    ],
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },

  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer", "Cash on Delivery"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// // Pre-save hook to update the updatedAt field
// orderSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Order = mongoose.model("Order", orderSchema);
export default Order;
