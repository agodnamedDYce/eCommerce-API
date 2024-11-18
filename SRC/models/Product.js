import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
  },

  images: {
    type: [String],
    default: [],
  },

  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rating: {
    type: Number,
    default: 0,
  },

  reviews: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
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

// Pre-save hook to update the updatedAt field

// productSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Product = mongoose.model("Product", productSchema);
export default Product;
