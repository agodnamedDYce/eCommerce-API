import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "male", "female"],
  },

  nationality: {
    type: String,
  },

  address: {
    type: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
      }
    ],
    default: [],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  bio: {
    type: String,
  },

  age: {
    type: Number,
  },

  otp: {
    type: String,
    default: null,
  },

  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },

  orderHistory: {
    type: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        purchaseDate: Date,
        totalAmount: Number,
      }
    ],
    default: [],
  },

  cart: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        }
      }
    ],
    default: [],
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

// // Set a pre-save hook to update the updatedAt field
// userSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const User = mongoose.model("User", userSchema);
export default User;
