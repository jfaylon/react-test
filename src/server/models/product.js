const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      tyoe: String
    },
    image: {
      type: String
    },
    tags: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
